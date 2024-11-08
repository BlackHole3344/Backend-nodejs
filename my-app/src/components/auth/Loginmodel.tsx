"use client"
import React from "react"
import Image from "next/image"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  }
   from "@/components/ui/dialog"
import { Button } from "../ui/button"
import {signIn} from "next-auth/react"

// this component provides a way to for users to triggers the login process through next auth
export default function LoginModel() {

  const handleLogin = () => { // this is our logic , we want to trigger it when the user clicks on the sign button
    signIn("google" , {
      callbackUrl :  "/dashboard" , // the route where the user should be redirected to after the login process
      redirect : true // this is a boolean that tells next auth to redirect the user to the callback url after the login process
    })
  }

  // const handlelogin = () => {
  //   signIn ("google" , { callbackUrl : "/dashboard" , redirect: true })
  // }
    return ( // this is the structure of the component
        <Dialog>
  <DialogTrigger asChild>
    <button>Sign In</button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className="text-2xl">Welcome To Qchat</DialogTitle>
      <DialogDescription>
        Qchat is a private chat App Makes it easier to Start Group , Individual Converstions through links in seconds.
      </DialogDescription>
    </DialogHeader>
    <Button variant= "outline" onClick={handleLogin}>
    <Image
        src="/images/google.png"
        className=" mr-4"
        width={25}
        height={25}
        alt="google"
          />
          Continue With Google
    </Button>
  </DialogContent>
</Dialog>


    )
} 
  