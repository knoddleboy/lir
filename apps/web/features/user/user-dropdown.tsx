"use client";

import {
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
import { useLogout } from "~/features/auth";
import { ThemeSwitch } from "~/shared";

import { Avatar } from "./avatar";
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
          <Avatar avatarUrl={user?.avatar} fallbackName={user?.name} size="md" />

          <div className="overflow-hidden font-medium">
            <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
              {user?.name}
            </div>
            <div className="text-accent-foreground/60 overflow-hidden text-ellipsis whitespace-nowrap text-xs">
              {user?.email}
            </div>
          </div>

          <div className="ml-1.5 flex items-center">
            <ThemeSwitch />
          </div>
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
