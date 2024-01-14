"use client";

import { Button, Icons } from "@lir/ui";

import React, { useRef, useImperativeHandle, useEffect, forwardRef } from "react";

import Link from "next/link";

import { searchModel } from "~/entities/search";
import { sessionModel } from "~/entities/session";

import { Avatar } from "./avatar";

interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ProfileCard = React.forwardRef<
  React.ElementRef<"div">,
  ProfileCardProps
>((props, ref) => {
  useEffect(() => {
    sessionModel.sessionStore.persist.rehydrate();
  }, []);

  const user = sessionModel.useCurrentUser();

  if (!user) {
    return <ProfileCardPublicViewer />;
  }

  return (
    <ProfileCardLoggedInViewer
      ref={ref}
      name={user.name}
      avatar={user.avatar}
      {...props}
    />
  );
});
ProfileCard.displayName = "ProfileCard";

const ProfileCardPublicViewer = () => {
  return (
    <div className="m-1.5 flex h-10 items-center px-1.5 py-1">
      {/* <Avatar
        avatarUrl="avatar.svg"
        size="base"
        className="bg-accent-foreground/40 text-accent mr-4"
      /> */}
      <PublicViewerAvatar className="mr-4 h-8 w-8" />
      <Link
        href="/signup"
        className="bg-accent-foreground/60 text-accent hover:bg-accent-foreground/50 active:bg-accent-foreground/70 shrink-0 select-none rounded-md px-2 py-0.5 text-sm font-medium"
      >
        Sign up to sync
      </Link>
      <div className="invisible w-8" />
    </div>
  );
};

// Avatar from /public/avatar.svg. Since there is kind of a bug with dynamic routes
// and public folder resolvement, this component is used. Needs a revision.
// @see https://github.com/vercel/next.js/discussions/38382
const PublicViewerAvatar = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={className}>
    <path
      opacity={0.4}
      className="fill-accent-foreground"
      d="M15.9,31.9c8.7,0,15.9-7.2,15.9-15.9c0-8.7-7.2-15.9-16-15.9C7.2,0,0,7.2,0,15.9C0,24.6,7.2,31.9,15.9,31.9z"
    />
    <path
      fill="#efe8e8"
      d="M15.9,29.5c-3.6,0-7.2-1.5-9.6-4c1.7-2.7,5.4-4.2,9.6-4.2c4.2,0,7.9,1.5,9.6,4.2C23.1,28,19.5,29.5,15.9,29.5z
	 M15.9,18.6c-3,0-5.4-2.5-5.4-5.9c0-3.2,2.4-5.8,5.4-5.8c3,0,5.4,2.6,5.4,5.8C21.3,16.1,18.9,18.6,15.9,18.6L15.9,18.6z"
    />
  </svg>
);

interface ProfileCardLoggedInViewerProps extends ProfileCardProps {
  name: string;
  avatar: string | null;
}

const ProfileCardLoggedInViewer = forwardRef<
  React.ElementRef<"div">,
  ProfileCardLoggedInViewerProps
>(({ name, avatar, ...rest }, ref) => {
  const setSearchMenuOpen = searchModel.useSearchStore(
    (state) => state.setSearchMenuOpen
  );

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
      {...rest}
      role="button"
      tabIndex={0}
      onPointerDown={setCardActive}
      onPointerUp={unsetCardActive}
      onPointerLeave={unsetCardActive}
      className="_ring hover:bg-control m-1.5 flex cursor-pointer select-none items-center rounded-md px-1.5 py-1"
    >
      <div className="shrink-0 grow-0">
        <Avatar avatarUrl={avatar} fallbackName={name} size="base" />
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="flex items-center">
          <div className="mr-1 overflow-hidden">
            <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium">
              {name}
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
          setSearchMenuOpen(true);
        }}
      >
        <Icons.search className="w-4" />
      </Button>
    </div>
  );
});
ProfileCardLoggedInViewer.displayName = "ProfileCardLoggedInViewer";
