import {Request  , Response} from "express"

import prisma from "../config/dbconnection.js"
class ChatGroupController {

    static async index (req : Request , res  : Response ) {
        try {
            const user = req.user

            console.log(user)

            const chat = await prisma.chatGroup.findMany({
                where : {
                    user_id : user.id
                } , 

                orderBy : {
                    created_at : "desc" 
                }
            })
            console.log(user)



            if(chat) {

                console.log("req recieve")
                return res.json({data: chat} )
            } else  {

            }
        } catch (error) {
            return res.status(500).json({message : "Something Went Wrong"})
        }
    }

    static async show(req : Request , res : Response) {
        try {
            const {id} = req.params ; 

            const groups = await prisma.chatGroup.findUnique({
                where : {
                    id: id 
                }
            })
            if (groups) {

                console.log(groups)
                return res.status(200).json({message : "Fetched Chat Group"})
            } else  {
                return res.status(404).json({message : "No chat groups exists with this id "})
            }
        } catch(error) {

        }
    }
    static async store(req : Request , res : Response) {
        try {

            const body = req.body ; 
            const user = req.user ; 

            console.log("creation requeswt")

            const chat = await prisma.chatGroup.create({
                data : {
                    title : body.title , 
                    passcode : body.passcode , 
                    user_id : user.id 
                }
            })

            if (chat) {
                return res.status(200).json({message : "chat group Created"})
            }

        } catch(error) {

        }
    }

    static async update(req : Request , res : Response ) {

        try {
        const {id} = req.params 
        const body = req.body 

        const chatUpdate = await prisma.chatGroup.update({
            data : {
                title : body.title  , 
                passcode : body.passcode , 
            } , where : {
                id : id 
            }
        })

        console.log("update request")

        if(chatUpdate) {
            return res.status(200).json({message : "Chat group Updated" , group : chatUpdate})
        } else {

            return res.status(401).json({message : "somthing went wrong"})
        }
        }catch(error) {
            return res.json({error})
        }

    }
    static async delete(req : Request , res : Response ) {

        try {
        const {id} = req.params 
    

        const chatUpdate = await prisma.chatGroup.delete({
            where : {
                id : id 
            }
        })

        console.log("delete request")

        if(chatUpdate) {
            return res.status(200).json({message : "Chat group Deleted" , group : chatUpdate})
        } else {

            return res.status(401).json({message : "somthing went wrong"})
        }
        }catch(error) {
            return res.json({error})
        }

    }
}



export  default ChatGroupController ; 