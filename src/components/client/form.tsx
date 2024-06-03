"use client"

import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CredentialsLogin from "@/actions/login";
import { auth } from "@/auth";
import { redirect, useRouter } from "next/navigation";

 
const LoginForm = async() => {
    const router=useRouter();

  return ( <form action={ async(formData)=>{
    const email=formData.get("email") as string;
    const password=formData.get("password") as string;
    if (!email || !password) return toast.error("please fill all fields")
   const toastId=toast.loading("Logging in")
    const err=await CredentialsLogin(email, password) as string | undefined;

    if (!err) {
        toast.success("login Success", {
            id: toastId
        })
        router.refresh()
    }else{
        toast.error(err,{
            id:toastId
        });
    }
    
  }} className="flex flex-col gap-4">
  <Input type="email" placeholder="email" name="email"/>
  <Input type="password" placeholder="password" name="password"/>
  <Button type="submit">Login</Button>
</form>
  )
}

export default LoginForm;