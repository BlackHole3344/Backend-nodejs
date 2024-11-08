import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import router from "./routes/index.js";
import { Server } from "socket.io";
import  {createServer} from "http"
import { SERVFAIL } from "dns";
import { setupSocket } from "./socket.js";



const app : Application = express(); 
const PORT = process.env.PORT || 7000;

const server = createServer(app) ; 

const io = new Server(server , {
  cors : {
    origin : "http://localhost:3000" 
  }
})  
export {io} ; 
setupSocket(io); 
// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  return res.send("It's working 🙌"); 
}) ;

app.use("/api" , router) ;
server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
