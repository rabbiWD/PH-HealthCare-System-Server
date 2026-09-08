import { cloudinary } from "../../lib/cloudinary"
import { prisma } from "../../lib/prisma";

const uploadProfileImage = async(buffer: Buffer, userId: string)=>{
    await cloudinary.uploader.upload_stream(
        {
        resource_type: "auto",
       },


       async(error, result) => {
        if(error){
            console.log(error)
            throw new Error(error.message);
        }
        console.log(result, "result");

        const updateUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                profileImage: result?.secure_url,
                imagePublicId: result?.public_id
            }

            
        });
        console.log(updateUser, "updateUser")
        // return result;
       }
).end(buffer)

}

export const UserService = {
    uploadProfileImage
}