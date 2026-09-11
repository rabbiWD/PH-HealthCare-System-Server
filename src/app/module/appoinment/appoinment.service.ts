
const verifyPatientEmail = async (payload: IVerifyEmailPayload) => {

	const otp = payload.otp;
	const email = payload.email.trim().toLowerCase();

	const isUserExist = await prisma.user.findUnique({
		where: { email },
	});

	// if (isUserExist?.emailVerified) {
	// 	throw new Error("Email is already verified");
	// }

	// if(!isUserExist){
	// 	throw new Error("User Already Exist")
	// };

	if(isUserExist?.status === "BLOCKED"){
		throw new Error("User is Blocked")
	}

	if(isUserExist?.emailVerified){
		throw new Error("Email Already Verified")
	}

	if(isUserExist?.isDeleted || isUserExist?.status === "DELETED"){
		throw new Error("User is Deleted")
	}

	const otpKey = `register-patient-otp:${email}`

	const redisOtp = await redisClient.get(otpKey)

	if(!redisOtp){
		throw new Error("Invalid OTP")
	}

	if(redisOtp !== otp){
		throw new Error("OTP Does not Match")
	}

	await redisClient.del([otpKey]);

	const registerPatientKey = `register-patient-data:${email}`

	const redisPatientData = await redisClient.get(registerPatientKey)

	if(!redisPatientData){
		throw new Error("Patient Does not Exist");
	}

	const patientPayload : IRegisterPatientPayload = JSON.parse(redisPatientData)
	 
	 const createdUser = await prisma.user.create({
		data: {
			name: patientPayload.name,
			email: patientPayload.email,
			password: patientPayload.password,
			role: Role.PATIENT,
			status: UserStatus.ACTIVE,
			emailVerified: true,
			patient: {
				create: { 
					name: patientPayload.name, 
					email: patientPayload.email, 
					contactNumber: patientPayload?.patient?.contactNumber || "" },
			},
		},
		omit: { password: true },
		include: { patient: true },
	});

	await redisClient.del([registerPatientKey]);

	const templatePath = path.join(process.cwd(), "src/app/template/welcome-email.ejs");

	const templateData = {
		name: createdUser.name,
	}

	const html =await ejs.renderFile(templatePath, templateData)

	await transporter.sendMail({
		from: config.email_sender,
		to: email,
		subject: "Welcome to PH Healthcare System",
		html
	})

	const { patient, ...user } = createdUser;
	const jwtPayload = {
		userId: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
	};

	const accessToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_access_secret,
		config.jwt_access_expires_in as SignOptions,
	);

	const refreshToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_refresh_secret,
		config.jwt_refresh_expires_in as SignOptions,
	);

	return {
		user,
		patient,
		accessToken,
		refreshToken,
	};
}