"use client";

import { Button, Icons } from "@lir/ui";

import { useSidebarStore } from "~/features/sidebar";

export const Header = () => {
  const isSidebarOpened = useSidebarStore((state) => state.isOpened);
  const toggleSidebar = useSidebarStore((state) => state.setIsOpened);

  return (
    <header className="bg-muted h-[52px] max-w-[100vw]">
      <div className="flex h-full items-center justify-between pl-2 pr-3">
        <Button
          size="icon"
          variant="control-ghost"
          onClick={() => toggleSidebar(!isSidebarOpened, true)}
        >
          <Icons.menu size={24} />
        </Button>
      </div>
    </header>
  );
};
