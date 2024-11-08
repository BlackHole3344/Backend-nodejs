"use client"
import { getSocket } from "@/lib/socket.config"
import React, { useEffect, useState } from "react"
import { v4 as uuidV4 } from "uuid"
import { Button } from "../ui/button"
import { io , Socket } from "socket.io-client"

interface MessageData {
  name: string;
  id: string;
}

export default function ChatBase() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = getSocket();
    setSocket(newSocket);
 
    newSocket.on("message", (data: MessageData) => {
    console.log("The socket message is: ", data);

    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8000", {
        autoConnect: true,
      });
      
      socket.on("connect", () => {
        console.log("Successfully connected to the server");
      });
      
      socket.on("connect_error", (error : Error) => {
        console.error("Failed to connect to the server:", error.message);
      });
      
      socket.on("disconnect", (reason : any) => {
        console.log("Disconnected from the server:", reason);
      });
    });

    return () => {
      newSocket.off("message");
      newSocket.close();
    };
  }, []);

  const handleClick = () => {
    if (socket) {
      socket.emit("message", { name: "akash", id: uuidV4() });
    }
  };

  return (
    <div>
      <Button onClick={handleClick}>send message</Button>
    </div>
  );
}