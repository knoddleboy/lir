"use client";

import { Avatar, AvatarFallback, AvatarImage, Button, Icons } from "@lir/ui";

import { useRef } from "react";

export const ProfileCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  const cardOnMouseDown = () => {
    if (!cardRef.current) return;
    cardRef.current.classList.remove("hover:bg-control");
    cardRef.current.classList.add("bg-control-foreground");
  };

  const cardOnMouseUp = () => {
    if (!cardRef.current) return;
    cardRef.current.classList.remove("bg-control-foreground");
    cardRef.current.classList.add("hover:bg-control");
  };

  return (
    <div className="m-1.5">
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        onMouseDown={cardOnMouseDown}
        onMouseUp={cardOnMouseUp}
        className="_ring hover:bg-control flex cursor-pointer select-none items-center rounded-md px-1.5 py-1"
      >
        <div className="mr-2 shrink-0 grow-0">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="" />
            <AvatarFallback>KN</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="flex items-center">
            <div className="mr-1 overflow-hidden">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium">
                Dmytro Knysh
              </div>
            </div>
            <Icons.chevronDown
              size={16}
              strokeWidth={2}
              className="text-accent-foreground/60 shrink-0 grow-0"
            />
          </div>
        </div>

        <div className="w-4 shrink-0"></div>

        <Button
          className="text-accent-foreground/60"
          variant="control-ghost"
          size="control-icon"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => {}}
        >
          <Icons.search className="w-4" />
        </Button>
      </div>
    </div>
  );
};
