"use client"; // this is a client component , it have access to client side functions eg : signIn , signOut , etc
import React from "react";
import Link from "next/link";
// import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "../ui/button";
import Loginmodel from "../auth/Loginmodel";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
export default function Navbar({user} :{user?:CustomUser}) {
  return (
    <nav className="p-6 flex justify-between items-center bg-white shadow-sm">
      <h1 className="text-xl md:text-2xl font-extrabold">QChat</h1>
      <div className="flex items-center space-x-2 md:space-x-6 text-gray-700">
        <Link href="/">Home</Link>                
        <Link href="#features">Features</Link>
        {!user? ( // if the user is not logged in , show the login model to login 
          <Loginmodel/> 
        ) : ( // if the user is logged in , show the dashboard link to go to the dashboard
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}