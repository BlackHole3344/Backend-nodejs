import NextAuth from "next-auth";
import { authOption } from "./options";


const nextAuth = NextAuth(authOption) // setting up the authentication process 
export {nextAuth as GET  , nextAuth as POST} // EXPORTING ROUTER 

