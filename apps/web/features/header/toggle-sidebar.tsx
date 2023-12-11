"use client";

import { Button, Icons } from "@lir/ui";

import { useSidebarStore } from "~/features/sidebar";

export const ToggleSidebar = () => {
  const isSidebarOpened = useSidebarStore((state) => state.isOpened);
  const toggleSidebar = useSidebarStore((state) => state.setIsOpened);

  return (
    <Button
      size="icon"
      variant="control-ghost"
      onClick={() => toggleSidebar(!isSidebarOpened, true)}
    >
      <Icons.menu size={24} />
    </Button>
  );
};
