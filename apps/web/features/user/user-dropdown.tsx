"use client";

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

import { ThemeSwitch } from "~/shared/theme-switch";

import { ProfileCard } from "./profile-card";

export const UserDropdown = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger
        asChild
        onClick={toggle}
        onKeyDown={(e) => {
          if (["Enter", " "].includes(e.key)) toggle();
        }}
      >
        <ProfileCard />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        onInteractOutside={() => setOpen(false)}
        onKeyDown={(e) => {
          if (["Enter", " ", "Escape"].includes(e.key)) setOpen(false);
        }}
        className="ml-3 w-72 p-0"
      >
        <div className="flex items-center px-3 py-2.5">
          <Avatar className="mr-3 h-10 w-10">
            <AvatarImage src="" alt="" />
            <AvatarFallback className="text-xl">KN</AvatarFallback>
          </Avatar>
          <div className="flex-1 font-medium">
            <div className="text-sm">Dmytro Knysh</div>
            <div className="text-accent-foreground/60 text-xs">text@text.com</div>
          </div>
          <ThemeSwitch />
        </div>
        <DropdownMenuSeparator className="mb-0 mt-1" />
        <DropdownMenuGroup className="bg-accent/40 py-1">
          <DropdownMenuItem className="mx-1 cursor-pointer text-sm font-medium">
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
