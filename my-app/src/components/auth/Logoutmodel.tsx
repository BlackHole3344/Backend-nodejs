//responsible for the logout 

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Dispatch, SetStateAction } from "react"

import {signOut} from  "next-auth/react"
// import { sign } from "crypto"


export default function LogoutModel({open , setOpen} : {open:boolean , setOpen : Dispatch<SetStateAction<boolean>>}) {
    
    const handleLogout = () => signOut({
        redirect : true , 
        callbackUrl : "/"
    })  
    return (
        <AlertDialog open = {open} onOpenChange = {setOpen} >
  <AlertDialogTrigger>Open</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure About This?</AlertDialogTitle>
      <AlertDialogDescription>
        This will Remove Your Session from this Browser 
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleLogout}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>


)
}