import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import User from "@/models/userModel";
import Link from "next/link";
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/utils";
 
  const page = () => {
    const create= async(formData:FormData)=>{
      "use server"
      const name=formData.get("name") as string ;
      const email=formData.get("email") as string;
      const password=formData.get("password") as string;
      if (!name || !email || !password) {
        throw new Error("Please fill all fields")
      }
     await connectDB();

      const ExistUser=await User.findOne({email});
      if (ExistUser) throw new Error("User Already Exist")
      
      const hashedPassword=await bcrypt.hashSync(password, 10);
      const user=new User({name,email,password:hashedPassword})
      await user.save();

      redirect("/login")
    }
    return (
      <div className="flex justify-center items-center h-dvh">
        <Card>
          <CardHeader>
            <CardTitle>SignUp</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={create} className="flex flex-col gap-4">
              <Input type="text" placeholder="name" name="name"/>
              <Input type="email" placeholder="email" name="email"/>
              <Input type="password" placeholder="password" name="password"/>
              <Button type="submit">SignUp</Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <span>or  {" "}</span>
          <form className="w-full">
              <Button type="submit" variant={"outline"} className="w-full">Login with Google</Button>
            </form>
            <Link href="/login">
              Already have an account? Login
          </Link>
          </CardFooter>
  
        </Card>
      </div>
    );
  };
  
  export default page;
  