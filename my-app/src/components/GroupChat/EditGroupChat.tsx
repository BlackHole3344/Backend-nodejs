"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"


import  React , {useState , useEffect , Dispatch , SetStateAction} from "react" 

import { Button } from "../ui/button";

import { Input } from "../ui/input";

import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { createChatSchema, createChatSchemaType } from "@/validations/groupValidation";
import { on } from "events";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { clearcache } from "@/actions/common";
import { Axios } from "axios"; 
import { Groupchat } from "@/types/GroupType";
import { Gruppo } from "next/font/google";
import { GET_CHATS } from "@/lib/apiEndPoints";
import { Fallback } from "@radix-ui/react-avatar";


export default function EditGroupChat({
    user , 
    group , 
    open , 
    setOpen
} : {user : CustomUser , group : Groupchat , open : boolean , setOpen : Dispatch<SetStateAction<boolean>>})
{
    const [loading , setloading] = useState(false) ; 

    const {
        register , 
        handleSubmit , 
        setValue , 
        formState : {errors}
    } = useForm<createChatSchemaType>({
        resolver : zodResolver(createChatSchema)
    }) ; 

    useEffect(() => {
        setValue("title" , group.title) , 
        setValue("passcode" , group.passcode) ; 

    } , [group]) ; 

    const onSubmit = async (payload  : createChatSchemaType) =>{

        try {
            setloading(true) ; 
            const {data} = await axios.put(`${GET_CHATS}/${group.id}` , payload , {
                headers : {
                    Authorization : user.token
                }

            }) ; 

            if(data?.message) {
                setOpen(false) ; 
                toast.success(data?.message) ; 
                clearcache("dashboard")
            } 
            setloading(false) ; 
        } catch(error) {
            setloading(false) ; 
            if(error instanceof AxiosError) {
                toast.error(error.message) ; 
            } else { 
                toast.error("Something went Wrong")
            }
        }

    } ; 

    return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
            <DialogTitle>Update Group Chat</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <Input placeholder="Enter chat title" {...register("title")} />
            <span className="text-red-400">{errors.title?.message}</span>
          </div>
          <div className="mt-4">
            <Input placeholder="Enter passcode" {...register("passcode")} />
            <span className="text-red-400">{errors.passcode?.message}</span>
          </div>
          <div className="mt-4">
            <Button className="w-full" disabled={loading}>
              {loading ? "Processing.." : "Submit"}
            </Button>
          </div>
        </form> 
      </DialogContent>
    </Dialog>
  );


    
}
