import {Request , Response , NextFunction} from "express"
import jwt from "jsonwebtoken"


// authenticating request weather its from right user or not , jwt verification , appending the request with a right user from 
const authMiddleware = (req : Request , res : Response  , next : NextFunction) => { //
    const authHeader = req.headers.authorization // takeout auth header from the request 

    if(authHeader === null || authHeader === undefined) {
        return res.status(401).json({status : 401 , message : "Unauthorized"})
    }

    console.log(authHeader)

    const token = authHeader.split(" ")[1] // extract the token


    jwt.verify(token , process.env.JWT_SECRET_KEY , (err , user ) =>{
        if(err) return res.status(401).json({status : 401 , message : "Invalid Token"})
            req.user = user as AuthUser // append the user after the token verfication to , request 
        next() // check = done , transfer the control to the route 
    })
}


export default authMiddleware ; 