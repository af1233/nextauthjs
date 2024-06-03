import NextAuth, { CredentialsSignin } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import User from "./models/userModel";
import bcrypt from 'bcryptjs';
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
  Credentials({
    name: "credentials",
    credentials: { 
      email: {
        label: "Email",
        type: "email",
      },
      password: {
        label: "Password",
        type: "password",
      },
},
 
authorize:async(credentials)=>{
     
    const email=credentials.email as string | undefined;
    const password=credentials.password as string | undefined;

    if (!email || !password) throw new CredentialsSignin({message:"Invalid credentials"});

    const user=await User.findOne({email});
     if (!user) throw new CredentialsSignin({cause:"Invalid User"});

     if (!user.password) throw new CredentialsSignin({cause:"Invalid password or email"});
     const isMatched=await bcrypt.compare(password, user.password);
     if (!isMatched) throw new CredentialsSignin({cause:"Invalid password or email"});
     return {name:user.name, email:user.email,id:user._id};
}   

}),
],
//   callbacks:{},
  pages:{
    signIn:"/login",
   
  },
})