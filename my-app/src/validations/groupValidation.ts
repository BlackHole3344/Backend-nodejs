import {z} from "zod"
export const createChatSchema = z 
.object({
    title:z.string().min(4 , {message : "Chat title must be 4 characters long . " 
    }).max(100 , {message : "chat title must be less than  100 ChARACTERS"}) , 
    passcode:z.string().min(4 , {message : "Passcode must be 4 characters long"}).max(25 , {message : "passcode should be less than 25 CHARACTERS"})
}).required()

export type createChatSchemaType = z.infer<typeof createChatSchema> ;