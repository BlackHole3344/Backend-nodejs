import ChatBase from "@/components/Chats/ChatBase";
import React from "react";

export default function chat({params} : {params : {id : string}}) {
    console.log("The Group id is " , params.id) 

    return (

        <div>
            <h1>hello chat</h1>
            <ChatBase/>
        </div>
    )
}

