import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/model/user";
import { User } from "next-auth";


//first you get params and inside it you get params parameter which gives messageid whose type will be string
export async function DELETE(request:Request , {params}:{params:{messageid:string}}) {
    const messageId = params.messageid
    await dbConnect()
    const session = await getServerSession(authOptions) // to know which user is login
    const user:User = session?.user as User //then taking user

    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"Not Authenticated"
        },{status:401}) 

    }
    try {
      const updateResult = await UserModel.updateOne(
        {_id:user._id},
        {$pull:{messages:{_id:messageId}}}

      ) 
      if(updateResult.modifiedCount == 0) {
         return Response.json({
            success:false,
            message:"Message not found or already delete"
        },{status:404})
      }
       return Response.json({
            success:true,
            message:"Message Deleted"
        },{status:200})
    } catch (error) {
        console.log("Error in delete message route",error)
        return Response.json({
            success:false,
            message:"Error deleting message"
        },{status:500})
        
    }
 
    
}