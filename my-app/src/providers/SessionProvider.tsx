
"use client" // this is a client component , sessions

import React from "react" 
import { SessionProvider as NextAuthSessionProvider} from "next-auth/react"
export default function SessionProvider({children} :{children :React.ReactNode}) { // session provider component for providing the session to the children components
    return  <NextAuthSessionProvider> {children} </NextAuthSessionProvider> // returning the session provider component
}


// By wrapping the entire application in the SessionProvider, 
// you're making sure that any component in your app can access session information 
// (like user authentication status) when needed.