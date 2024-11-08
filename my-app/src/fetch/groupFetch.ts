import {GET_CHATS } from "@/lib/apiEndPoints";

export async function fetchChatGroup(token : string) {
        const res = await fetch(GET_CHATS , {
            headers : {
                Authorization : token 
            } , 
            next : {
                revalidate : 60*60 , 
                tags : ["dashboard"]
            }
        })
        if(!res.ok) {
            throw new Error("Failed to fetch Data") 
        }

        const response = await res.json()

        console.log(response)
        
        if (response?.data) {
            console.log(response?.data)
            return response?.data
        }
        return [] ; 
}