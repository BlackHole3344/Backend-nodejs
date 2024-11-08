// "use client"
import Navbar from "@/components/base/Navbar";// 
import HeroSection from "@/components/base/HeroSection";
import FeatureSection from "@/components/base/FeatureSection";
import UserReviews from "@/components/base/UserReviews";
import Footer from "@/components/base/Footer";
import { authOption, CustomSession , CustomUser } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

import { Group } from "next/dist/shared/lib/router/utils/route-regex";




export default async function Home() { // Home page render
  const session:CustomSession | null = await getServerSession(authOption) // getting the sesssi0on of the user for validating if the user is logged in or not
  
  return (
    <div className="min-h-screen flex flex-col ">
      {/* Header */}
      <Navbar user={session?.user} />
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeatureSection />

      {/* User Reviews Section */}
      <UserReviews />

      {/* Footer */}
      <Footer />
    </div>
    
  );
}
