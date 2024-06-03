 
"use server"

import { signIn } from "@/auth";
import { connectDB } from "@/lib/utils";
import User from "@/models/userModel";
import { CredentialsSignin } from "next-auth";
 
const CredentialsLogin= async(email:string , password:string)=>{
   await connectDB();
   
    const ExistUser=await User.findOne({email});
    if (!ExistUser) throw new Error("User Not Found");

    try {
      await signIn("credentials",{
        email,
        password,
        redirect:true,
        redirectTo:"/",
      })
    } catch (error) {
      const err= error as CredentialsSignin;
      return err.cause;
    }
    
  }

  export default CredentialsLogin;