"use client";

import { cn } from "@lir/lib";
import { Button, Icons, Skeleton } from "@lir/ui";

import { useEffect } from "react";
import { useIsClient } from "usehooks-ts";

import Link from "next/link";

import { sessionModel } from "~/entities/session";

type Props = {
  classNames?: string;
};

export const Nav = ({ classNames }: Props) => {
  const isClient = useIsClient();

  useEffect(() => {
    sessionModel.sessionStore.persist.rehydrate();
  }, []);

  const isAuth = sessionModel.useAuth();

  return (
    <nav className={cn(classNames)}>
      <div className="flex justify-between">
        <ul className="flex items-center gap-1"></ul>
        {isClient ? (
          isAuth ? (
            <Button variant="ghost" size="link" text="base" asChild>
              <Link href="/d">
                Go to web app <Icons.arrowRight className="ml-1" size={16} />
              </Link>
            </Button>
          ) : (
            <ul className="flex shrink-0 items-center gap-4">
              <li>
                <Button variant="ghost" size="link" text="base" asChild>
                  <Link href="/login">Log in</Link>
                </Button>
              </li>
              <li>
                <Button size="link" className="text-[15px]" asChild>
                  <Link href="/signup">Sign up</Link>
                </Button>
              </li>
            </ul>
          )
        ) : (
          <Skeleton className="h-8 w-36" />
        )}
      </div>
    </nav>
  );
};
