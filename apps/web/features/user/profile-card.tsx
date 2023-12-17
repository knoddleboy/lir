"use client";

import { getInitials } from "@lir/lib";
import { Avatar, AvatarFallback, AvatarImage, Button, Icons } from "@lir/ui";

import React, { useRef, useImperativeHandle, useEffect } from "react";

import { useSearchStore } from "~/entities/search/model/store";
import { sessionModel } from "~/entities/session";
import { useCurrentUser } from "~/entities/session/model/session-model";

interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ProfileCard = React.forwardRef<
  React.ElementRef<"div">,
  ProfileCardProps
>((props, ref) => {
  useEffect(() => {
    sessionModel.sessionStore.persist.rehydrate();
  }, []);

  const user = useCurrentUser();

  const toggleSearchDialog = useSearchStore((state) => state.setOpen);

  const cardRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => cardRef.current!);

  const setCardActive = () => {
    if (!cardRef.current) return;
    cardRef.current.classList.remove("hover:bg-control");
    cardRef.current.classList.add("bg-control-foreground");
  };

  const unsetCardActive = () => {
    if (!cardRef.current) return;
    cardRef.current.classList.remove("bg-control-foreground");
    cardRef.current.classList.add("hover:bg-control");
  };

  return (
    <div
      ref={cardRef}
      {...props}
      role="button"
      tabIndex={0}
      onPointerDown={setCardActive}
      onPointerUp={unsetCardActive}
      className="_ring hover:bg-control m-1.5 flex cursor-pointer select-none items-center rounded-md px-1.5 py-1"
    >
      <div className="mr-2 shrink-0 grow-0">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.avatar || ""} />
          <AvatarFallback className="text-[15px]">
            {getInitials(user?.name)}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="flex items-center">
          <div className="mr-1 overflow-hidden">
            <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium">
              {user?.name}
            </div>
          </div>
          <Icons.chevronDown
            size={16}
            strokeWidth={2}
            className="text-accent-foreground/60 shrink-0 grow-0 transition-transform"
          />
        </div>
      </div>

      <div className="w-4 shrink-0"></div>

      <Button
        variant="control-ghost"
        size="control-icon"
        onPointerDown={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          toggleSearchDialog(true);
        }}
      >
        <Icons.search className="w-4" />
      </Button>
    </div>
  );
});
ProfileCard.displayName = "ProfileCard";
