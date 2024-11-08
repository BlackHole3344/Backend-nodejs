import CreateChat from "@/components/GroupChat/CreateChat";
import DashNav from "@/components/dashboard/DashNav";
import React from "react";
import { authOption, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { fetchChatGroup } from "@/fetch/groupFetch";
import GroupChatCard from "@/components/GroupChat/GroupChatCard";
import { Groupchat } from "@/types/GroupType";

export default async function dashboard() {
  const session: CustomSession | null = await getServerSession(authOption);
  const groups: Array<Groupchat> | [] = await fetchChatGroup(
    session?.user?.token!
  );
  console.log(session?.user?.token)
  return (
    <div>
      <DashNav
        name={session?.user?.name!}
        image={session?.user?.image ?? undefined}
      />
      <div className="container">
        <div className="mt-6 text-end">
          <CreateChat user={session?.user!} />
        </div>

        {/* If Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.length > 0 &&
            groups.map((item, index) => (
              <GroupChatCard group={item} key={index} user={session?.user!} />
            ))}
        </div>
      </div>
   </div>
  );
}
