//exposing the required api endpoints from env 
import Env from "./env"


// Efficiently managing the backend routes , for using with frontend
// so that we don't have to hardcode the backend routes in the frontend
export const BASE_URL = Env.SERVER_URL;
export const API_URL = BASE_URL + "/api"
export const LOGIN_URL = API_URL + "/auth/login"
export const CREATE_CHAT  = API_URL + "/chat-group"
export const GET_CHATS = "http://localhost:8000/api/chat-group"
export const BACKEND_URL = ""


