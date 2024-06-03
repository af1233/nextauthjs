"use client"
import { signOut } from "next-auth/react";
import { cookies } from "next/headers";

const Page = () => {
  const handleLogout = async () => {
    cookies().delete('')
  };

  return (
    <div>
      <button onClick={handleLogout}>LogOut</button>
    </div>
  );
};

export default Page;
