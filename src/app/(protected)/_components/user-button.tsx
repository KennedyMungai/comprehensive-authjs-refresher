"use client";

import { signOutAction } from "@/actions/signout-action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserIcon } from "lucide-react";
import { useSession } from "next-auth/react";

const UserButton = () => {
  const session = useSession();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={session?.data?.user?.image ?? ""} />
          <AvatarFallback>
            <UserIcon className="size-5" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="w-full p-0">
          <form action={signOutAction} className="w-full">
            <Button className="w-full">Sign Out</Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
