

import { Request , Response } from "express";
import prisma from "../config/dbconnection.js"; 
import jwt from "jsonwebtoken"

interface LoginPayloadType { //

    name : string ;
    email : string ;
    provider : string ;
    oauth_id : string ; 
    image? : string | null ;

}

class AuthController {

    static async login(req : Request , res : Response) { //
        try {
            const body : LoginPayloadType = req.body // get the body from the request from client

            console.log(body) 

            let findUser = await prisma.user.findUnique({ // find the user in the database with this particular email

                where : {
                    email : body.email
                }

            })
            if(!findUser) { // if no user if found , create a new user with the given data
                findUser = await prisma.user.create({
                    data : body 
                })
            } 

            let JWTpayload = { //extract the jwt payload for creating a token
                name : body.name ,
                email : body.email ,  
                id : findUser.id
            }
            
            const token = jwt.sign(JWTpayload ,process.env.JWT_SECRET_KEY , {
                expiresIn : "365d"
            })

            return res.json({
                message : "Logged in Sucessfully"
                 ,user : {
                    ...findUser , // sending the user data to the client
                    token : `Bearer ${token}` //sending the token to client with bearer prefix

                }

            })

        }catch(error) {
            return res.status(500).json({message : "Somthing went Wrong. please try again"})


        }
    }

    

    
}

export default AuthController ; 