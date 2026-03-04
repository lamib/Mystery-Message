import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/model/user";


export async function POST(request:Request) {
    await dbConnect()
    try {
      const {username,code} = await request.json() 
      const decodedUsername = decodeURIComponent(username) //url through username aayo vane decode garna chaixa
      const user = await UserModel.findOne({username:decodedUsername})
      if(!user){
        return Response.json({
            success:false,
            message:"User not found"
        },{status:500})
      }
      const isCodeValid = user.verifyCode === code
      const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()
      if (isCodeValid && isCodeNotExpired){
            user.isverified = true
            await user.save()
      
            return Response.json({
                sucess:true,
                message:"Account verified successfully"
            },
            {status:200})

        }else if(!isCodeNotExpired){
            return Response.json({
                success:false,
                message:"Verification code has expired, please signup again "
            },{status:400})
        }else{
            return Response.json({
                success:false,
                message:"Incorrect Verification code "
            })
        }

    } catch (error) {
        console.error("Error verifying user",error)
        return Response.json({
            sucess:false,
            message:"Error verifying user"
        },
        {status:500}) 
    }

    
}