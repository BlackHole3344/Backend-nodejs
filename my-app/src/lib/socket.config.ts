import { io, Socket } from "socket.io-client";
import Env from "./env";

let socket: Socket;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io("http://localhost:8000", { autoConnect: true });
    
    socket.on("connect", () => {
      console.log("Socket actually connected");
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });
  }
  return socket;
};