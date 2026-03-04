import { resend } from "@/src/lib/resend";
import VerficationEmail from "@/emails/verificationEmail";
import { ApiResponse } from "../types/ApiRsponse";


export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string,
) :Promise<ApiResponse>{
    try {
       await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Mystry message | Verification code',
        react: VerficationEmail({username,otp:verifyCode}),
}); 
       return {success:true, message:'Verification email send successfully'}
 
    } catch (emailError) {
        console.error("Error sending verification email",emailError)
        return {success:false, message:'Failed to send verification email'}
        
    }
    
}
