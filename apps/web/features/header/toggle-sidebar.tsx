"use client";

import { Button, Icons, Skeleton } from "@lir/ui";

import { useIsMounted } from "~/shared";

import { useSidebarStore } from "../sidebar/store";

export const ToggleSidebar = () => {
  const isSidebarOpened = useSidebarStore((state) => state.isOpened);
  const toggleSidebar = useSidebarStore((state) => state.setIsOpened);

  const isMounted = useIsMounted();

  if (!isMounted) {
    return <Skeleton className="h-6 w-7" />;
  }

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
