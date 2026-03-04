"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signInSchema } from "@/src/schema/signInSchema";
import { signIn } from "next-auth/react";

// component names must start uppercase i.e not page but Page
const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  //zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn('credentials', {
      redirect:false,
      identifier:data.identifier,
      password:data.password
    })
    if(result){
      toast.error("Incorrect username or password")
     
    }

    if(result?.url){
      router.replace('/dashboard')
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-2">
      <div className="w-full max-w-md space-y-8 bg-white rounded-lg shadow-md p-5 text-black">
        <div className="text-center ">
          <h1 className="text-4xl text-black font-extrabold tracking-tight lg:text-5xl mb-6 flex-col">
            Join Mystery Message
          </h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-black  ">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input placeholder="email/username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <Button type="submit">
                  Sign in
                  </Button>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
           
            <Link
              href={"/sign-up"}
              className="text-blue-600 hover:text-blue-800"
            >
             Create new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
