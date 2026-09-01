import * as z from "zod";

 const PatientRegistrationZodSchema = z.object({
	name: z.string().min(3, "Name must be at least 3 characters long").max(10, "Name must be at most 10 characters long"),
	email: z.email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters long").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[0-9]/, "Password must contain at least one digit").regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
	patient: z.object({
		contactNumber: z.string().optional(),
	}).optional()
})

 const PatientVerifyEmailZodSchema = z.object({
	email: z.email("Invalid email address"),
	otp: z.string().length(6)
	
})

const PatientLoginZodSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[0-9]/, "Password must contain at least one digit").regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
})

const ForgotPasswordZodSchema = z.object({
    email: z.email("Invalid email address"),
})

const ResetPasswordZodSchema = z.object({
    email: z.email(),
    newPassword: z.string()
	.min(8, "Password must be at least 8 characters long")
	.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
	.regex(/[a-z]/, "Password must contain at least one lowercase letter")
	.regex(/[0-9]/, "Password must contain at least one digit")
	.regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
	otp: z.string().length(6)
})

export const UserValidation ={
    PatientRegistrationZodSchema,
    PatientVerifyEmailZodSchema,
    PatientLoginZodSchema,
	ForgotPasswordZodSchema,
	ResetPasswordZodSchema
}