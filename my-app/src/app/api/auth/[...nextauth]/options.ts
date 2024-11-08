import { AuthOptions, ISODateString  , Account} from "next-auth"; 
import GoogleProvider from "next-auth/providers/google" 
import { JWT } from "next-auth/jwt"; 
import axios from "axios"; // axios for making backend request 
import { LOGIN_URL } from "@/lib/apiEndPoints";

export interface CustomSession { // custom session interface for incorporating the custom user deatils
    user?:CustomUser ;
    expires : ISODateString // this is the type of the expires property in the session object
}

export interface CustomUser { //custom user interface for incorporating the custom user deatils
    id?:string | null 
    name?:string|null
    email?:string | null
    image?: string | null
    provider?: string | null
    token?: string | null 

}



export const authOption:AuthOptions = { // is a object that configures the authentication process ,
    pages : {
        signIn : "/" // the route where my authentication should take place 
    } , 

    callbacks : { // this object describes the behavior of the authentication process , what callback should be made when the user is signing in , session is being created , token is being created 

        async signIn({user, account} : {user : CustomUser , account : Account|null}) { // this is a callback function that is called when the user is signing in 
            console.log("The user data is " , user)
            console.log("The account is" , account)

            const payload = { // this is the payload that we are sending to the backend 
                name : user.name  , 
                email : user.email , 
                oauth_id : account?.providerAccountId , 
                provider:account?.provider , 
                image : user?.image 
            }

            const {data} = await axios.post(LOGIN_URL, payload) // making a post request to the backend with the payload 

            user.id = data?.user?.id.toString()// setting the user id to the id of the user in the database
            user.token = data?.user?.token // setting the user token to the token of the user in the database
            user.provider = data?.user?.provider  // setting the user provider to the provider of the user in the database
            
            return true // returning true to indicate that the user is signed in
        } , 

        async session({session , user , token} :{session : CustomSession , user : CustomUser , token : JWT }) {
            session.user = token.user as CustomUser // setting the user in the session to the user in the token
            return session ; // returning the session
            
        } , 
        async jwt({user , token}) { // this is a callback function that is called when the token is being created
            if(user) {
                token.user = user // setting the user in the token to the user in the user object
            }
            return token 
        }
    } , 

    providers : [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,// by default typescript treat env variables as undefined but with ? asseration operator we are telling its always defined 

            clientSecret: process.env.GOOGLE_SECRET!,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
              }
          }
          ),
          

    ]

    }