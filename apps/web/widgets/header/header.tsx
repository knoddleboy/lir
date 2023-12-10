"use client";

import { Button, Icons } from "@lir/ui";

export const Header = () => {
  return (
    <header className="bg-muted h-11 max-w-[100vw]">
      <div className="flex h-full items-center justify-between pl-2 pr-3">
        <Button size="icon" variant="control-ghost">
          <Icons.menu size={24} />
        </Button>
      </div>
    </header>
  );
};
