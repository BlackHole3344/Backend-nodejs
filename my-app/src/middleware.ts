export { default}  from "next-auth/middleware"

//this middleware checks if the user is authenticated for the particular routes in matcher
//is yes and it will take us to the dashboard page
//if not it will take us to the login page

export const config = {
    matcher : ["/dashboard"]  
}