import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/model/user";
import { User } from "next-auth";
//session- way for app to remember who the user is after log in
//request is an object that contains everything the client sends
export async function POST(request:Request) {
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user:User = session?.user as User

    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"Not Authenticated"
        },{status:401}) 

    }
    const userId = user._id;
    const {acceptMessages} = await request.json()
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        {isAcceptingMessage:acceptMessages},
        {new:true} //updated value pauna ko lagi
      ) 
      if(!updatedUser){
        return Response.json({
            success:false,
            message:"failed to update user status ti accept messages"
        }, {status:401}) 
      }
      return Response.json({
            success:false,
            message:"Message acceptance status updated susccefully",
            updatedUser
      }, {status:401}) 

    } catch (error) {
       console.log("failed to update user status to accept messages")
       return Response.json({
        success:false,
        message:"failed to update user status ti accept messages"
       }, {status:500}) 
    }
     
}

export async function GET(request:Request) {
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user:User = session?.user as User

    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"Not Authenticated"
        },{status:401}) 

    }
    const userId = user._id;
    const foundUser = await UserModel.findById(userId) 
      try {
         if(!foundUser){
          return Response.json({
              success:false,
              message:"User not found"
          }, {status:401}) 
        }
        return Response.json({
            success:true,
            message:foundUser.isAcceptingMessage
        }, {status:401}) 
        
      } catch (error) {
        console.log("failed to update user status to accept messages")
       return Response.json({
        success:false,
        message:"Error is getting message acceptance status"
       }, {status:500}) 
      }
  
}