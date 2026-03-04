'use client'
import { Button } from "@/components/ui/button";
// to make sure it is client component and as default it was server component which dont run useStae , useEffect and only renders static content
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { verifySchema } from "@/src/schema/verifySchema";
import { ApiResponse } from "@/src/types/ApiRsponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
//function component, always start with capital which returns UI(html)
const VerifyAccount = () => {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema), // allow zod to validate form i.e validation checker
  });
  //data is the form data
  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      //send data to server  / where to send / data to send
      const response = await axios.post(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      });
      toast("Success", {
        description: response.data.message,
      });
      router.replace("sign-in");
    } catch (error) {
      console.error("Error in signup for user", error);
      const axiosError = error as AxiosError<ApiResponse>;
      toast("Signup Failed", {
        description:
          axiosError.response?.data.message ?? "something went wrong",
      });
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-2">
      <div className="w-full max-w-md space-y-8 bg-white rounded-lg shadow-md p-5 text-black">
        <div className="text-center ">
          <h1 className="text-4xl text-black font-extrabold tracking-tight lg:text-5xl mb-6 flex-col">
           Verify Your Account
          </h1>
          <p className="mb-4">Enter the verification code sent to your email</p>
        </div>
         <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-black  ">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="code"
                      {...field}
                      
                    />
                  
                  </FormControl>
                
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
            
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyAccount;
