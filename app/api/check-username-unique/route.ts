import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/model/user";
import {z} from 'zod';
import { usernameValidation } from "@/src/schema/signUpSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})


export async function GET(request:Request){
    await dbConnect()
    try {
       const {searchParams} = new URL(request.url)
       const queryParam = {
        username:searchParams.get('username')
    }
    //validate with zod
    const result = UsernameQuerySchema.safeParse(queryParam)
    console.log(result) //remove later
    if(!result.success){
        const usernameErrors = result.error.format().username?._errors || []
        return Response.json({
            success:false,
            message:usernameErrors?.length > 0 ? usernameErrors.join(',') : 'Invalid query parameters',

        },{status:400})
    }
        const {username} = result.data
        const existingVerifiedUser = await UserModel.findOne({username, isverified:true})
        if(existingVerifiedUser){
            return Response.json({
            sucess:false,
            message:"Username is already taken"

        },
        {status:400})
        }
        return Response.json({
            sucess:true,
            message:"Username is unique"

        },
        {status:400})
        

    } catch (error) {
        console.error("Error checking username",error)
        return Response.json({
            sucess:false,
            message:"Error checking username"

        },
        {status:500})
    }

}