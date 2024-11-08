export class Env {
    static APP_URL:string = process.env.NEXT_PUBLIC_APP_URL as string ; 
    static SERVER_URL : string = process.env.NEXT_PUBLIC_BACKEND_URL as string ; // could be keeping only this acessible through Env.
}
export default Env ; 