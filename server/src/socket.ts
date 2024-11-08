import { Socket } from "dgram";
import { Server } from "socket.io";

export function setupSocket(io : Server) {

    io.on("connection" , (socket) => {
        console.log("The socket is connected.." , socket.id)

        socket.on("message" , (data) => {
            console.log("message is " ,data )
            io.emit("message" , data) ; 
        })

        socket.on("disconnect" , ()=>{
            console.log("A User is dissconnected..." , socket.id)
        })
    })
}