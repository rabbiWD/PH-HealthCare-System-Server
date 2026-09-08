import { UploadApiResponse } from "cloudinary";
import { cloudinary } from "../../lib/cloudinary"
import { prisma } from "../../lib/prisma";

const uploadProfileImage = async(buffer: Buffer, userId: string)=>{
  
const clodinaryResult = await new Promise<UploadApiResponse> ((resolve, reject) => {
    cloudinary.uploader.upload_stream(
        {
        resource_type: "auto",
       },


       async(error, result) => {
        if(error){
            return reject(error)
        }

        if(!result){
            return reject(new Error("No result returned from Cloudinary"))
        }

        resolve(result)

        
        
       }
).end(buffer)
})

const updateUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                profileImage: clodinaryResult?.secure_url,
                imagePublicId: clodinaryResult?.public_id
            },

            omit: {
                password: true,
            }
      });
   

      return updateUser

}

export const UserService = {
    uploadProfileImage
}