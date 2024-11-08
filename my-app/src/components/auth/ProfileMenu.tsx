"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "../common/UserAvatar";
import dynamic from "next/dynamic";
const LogoutModal = dynamic(() => import("../auth/Logoutmodel"));

export default function ProfileMenu({
  image,
  name,
}: {
  image?: string;
  name: string;
}) {
  const [logoutOpen, setLogoutOpen] = useState(false);
  return (
    <>
      {/* Render LogoutModal when logoutOpen is true */}
      {logoutOpen && <LogoutModal open={logoutOpen} setOpen={setLogoutOpen} />}
      
      {/* Main dropdown menu for user profile */}
      <DropdownMenu>
        {/* Trigger for the dropdown menu */}
        <DropdownMenuTrigger>
          {/* Display user avatar */}
          <UserAvatar name={name} image={image} />
        </DropdownMenuTrigger>
        
        {/* Content of the dropdown menu */}
        <DropdownMenuContent>
          {/* Label for the menu */}
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          {/* Separator line */}
          <DropdownMenuSeparator />
          {/* Menu item for user profile */}
          <DropdownMenuItem>Profile</DropdownMenuItem>
          {/* Menu item for logout, opens LogoutModal when clicked */}
          <DropdownMenuItem onClick={() => setLogoutOpen(true)}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
