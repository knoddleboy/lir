import { APP_NAME, cn } from "@lir/lib";
import { Button, Icons } from "@lir/ui";

import Link from "next/link";

import { abril } from "~/app/fonts";

import Nav from "./nav";

type Props = {
  includeNav?: boolean;
};

export default function Header({ includeNav = true }: Props) {
  return (
    <header className="fixed z-50 w-screen">
      <div className="container m-auto flex h-20 items-center justify-center">
        <div className="shrink-0">
          <Button variant="link-ghost" size="link-ghost" text="base" asChild>
            <Link href="/">
              <div className="flex items-center justify-center">
                <Icons.logo className="mr-1 h-8 w-8" />
                <div className={cn("text-xl font-medium", abril.className)}>
                  {APP_NAME}
                </div>
              </div>
            </Link>
          </Button>
        </div>
        <div className="flex-1">{includeNav && <Nav />}</div>
      </div>
    </header>
  );
}
