
"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"


import  React , {useState} from "react" 

import { Button } from "../ui/button";

import { Input } from "../ui/input";

import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { createChatSchema, createChatSchemaType } from "@/validations/groupValidation";
import { on } from "events";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

import { Axios } from "axios";
import { CREATE_CHAT } from "@/lib/apiEndPoints";
import { headers } from "next/headers";
import { clearcache } from "@/actions/common";

export default function CreateChat( {user} : {user : CustomUser} ) {
    const [open , setOpen] = useState(false); //Using for controlling the state of dialog box , when to showup and when to now , useState(false) toggles the behavior 

    const [loading , setloading] = useState(false); //Using for controlling the state of loading, when to showup and when to now , useState(false) toggles the behavior 

    const { // validating , the data entered in the fields with react hooks , 
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<createChatSchemaType>({

        resolver : zodResolver(createChatSchema),
      }) ; 

      const onSubmit  = async (payload : createChatSchemaType) => {
        try {
            setloading(true) // when click on submit , we are showing loading 
            const {data} = await axios.post(CREATE_CHAT , {...payload , user_id :user.id } , {
                headers : {
                    Authorization : user.token  //(...) spread operator we are extending the payload json with user_id field
                }

            }) 

            if(data?.message) { // from backend we are sending a message , if message recieved
                setloading(false) //stop loading 
                setOpen(false) //close dialog 

                clearcache("dashboard")  



                toast.success(data?.message) ; // show message  
            }

        } catch(error) { 
            setloading(false) ; // if error close loading  
            if (error instanceof AxiosError) { // if there is axios error 
                toast.error(error.message) //show error
            } else {
                toast.error("somthing went wrong")
            }
            }
        }
      
    
    
    return ( // <component logic(props) > adding life to static components what behavior they should emit .
<Dialog open={open} onOpenChange={setOpen}>  
      <DialogTrigger asChild>
        <Button>Create Chat</Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create your new Chat</DialogTitle>
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


