
// this layout defines the overall structure of the app 
import localFont from "next/font/local";
import { Inter as FontSans } from "next/font/google";
import type { Metadata } from 'next'
import { cn } from "@/lib/utils";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

import SessionProvider from "../providers/SessionProvider" // import the session provider for providing the session to the children components


const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Qchat App",
  description: "Just Chat quick",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          geistSans.variable,
          geistMono.variable
        )}
      >

        <Toaster richColors duration={5000}/> 
        {children}
      </body>

      </SessionProvider>
      
    </html>
  );
}