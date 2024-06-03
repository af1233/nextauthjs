import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import LoginForm from "@/components/client/form";
import Link from "next/link";
import { auth, signIn } from "@/auth";
import { use } from "react";
import { redirect } from "next/navigation";

const page = async() => {
   const session= await auth();
   const user=session?.user;
   if (user) {
   return redirect('/')
   }
  return (
    <div className="flex justify-center items-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm/>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <span>or  {" "}</span>
        <form action={async()=>{
          "use server"
          await signIn("google")
        }} className="w-full">
            <Button type="submit" variant={"outline"} className="w-full">Login with Google</Button>
          </form>
          <Link href="/signup">
            Don't have account? Signup
        </Link>
        </CardFooter>

      </Card>
    </div>
  );
};

export default page;
