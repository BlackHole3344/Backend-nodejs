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

  import { useState } from "react"
import { Dispatch , SetStateAction } from "react"

import axios from "axios"
import { CREATE_CHAT, GET_CHATS } from "@/lib/apiEndPoints"
import {toast} from "sonner"; 
import { clearcache } from "@/actions/common"
import { clear } from "console"

export default function DeleteChat({
    open , 
    setOpen , 
    groupId , 
    token , 
} : {open : boolean , 
    setOpen : Dispatch<SetStateAction<boolean>>;  
    groupId : string , 
    token : string 
}) { 

    const [loading , setloading] = useState(false) ; 

    const DeleteChatGroup = async () =>{
        setloading(true) ; 
        try {
            const {data} = await axios.delete(`${GET_CHATS}/${groupId}` , {
                headers : {
                    Authorization : token , 
                } , 
            }) ; 

            if(data?.message) {
                clearcache("dashboard")
                toast.success(data?.message)
                setOpen(false)
            } 
            setloading(false) ; 

        } catch(error) {
            if(error) {
                toast.error("somthing went wrong")
            }
        }
    } ; 

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your chat
            group and it's conversations.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={DeleteChatGroup}>
            {loading ? "Processing.." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    )

}