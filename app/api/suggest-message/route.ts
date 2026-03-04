
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";

export async function POST (req:Request){
    try {
      
      const prompt ="Create a list of three open-ended and engaging questions formatted as a single string. Each question should by separated by '||'. These questions are for an anonyomous social messaging platform, like Qooh.me, and should be suitable for diverse audience. Avoid personal or sensitive topics, focusing instead on universl themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started? || If you could have dinner with any historical figure, who would it be? || What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment"
    //ask openai for a streaming chat completion given the prompt
      const result = await streamText({
        model:openai("gpt-4o-mini"), // recommended model
        prompt,
        
        });

    // Return streaming response
    return result.toTextStreamResponse();
   
    } catch (error) {
        console.error("Error generating suggestions:", error);
        return new Response("Failed to generate suggestions", { status: 500 });
   /*     if(error instanceof OpenAI.APIError){
        const {name, status, headers, message} = error
        return NextResponse.json({
            name,status,headers,message
        })

       }else{
        console.error("An unexpected error occured",error)
        throw error
       }  */
    }
}