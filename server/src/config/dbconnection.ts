import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ // creating a new prisma client 
    log : ["error" , "query"] // logging the errors and queries
}) ; 

export default prisma ;  



