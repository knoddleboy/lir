"use client";

import { getInitials } from "@lir/lib";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@lir/ui";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { sessionModel } from "~/entities/session";
import { ThemeSwitch } from "~/shared/theme-switch";

import { useLogout } from "../auth/logout/api/logout";
import { ProfileCard } from "./profile-card";

export const UserDropdown = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const user = sessionModel.useCurrentUser();

  // TODO: refactor -> widgets
  const { mutateAsync: _logout } = useLogout();

  const logout = async () => {
    await _logout();
    router.replace("/");
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild onClick={() => setOpen(!open)}>
        <ProfileCard />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="ml-3 w-72 p-0">
        <div className="flex items-center px-3 py-2.5">
          <Avatar className="mr-3 h-10 w-10">
            <AvatarImage src={user?.avatar || ""} />
            <AvatarFallback className="text-[19px]">
              {getInitials(user?.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 font-medium">
            <div className="text-sm">{user?.name}</div>
            <div className="text-accent-foreground/60 text-xs">{user?.email}</div>
          </div>
          <ThemeSwitch />
        </div>

        <DropdownMenuSeparator className="mb-0 mt-1" />

        <DropdownMenuGroup className="bg-accent/40 py-1">
          <DropdownMenuItem
            onClick={logout}
            className="mx-1 cursor-pointer text-sm font-medium"
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
