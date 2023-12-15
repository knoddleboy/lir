import { cn } from "@lir/lib";
import { Button, Icons } from "@lir/ui";

import Link from "next/link";

import { isAuth } from "~/shared/lib/is-auth";

type Props = {
  classNames?: string;
};

export const Nav = ({ classNames }: Props) => {
  return (
    <nav className={cn(classNames)}>
      <div className="flex justify-between">
        <ul className="flex items-center gap-1"></ul>
        <ul className="flex shrink-0 items-center gap-4">
          {!isAuth() ? (
            <>
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
            </>
          ) : (
            <li>
              <Button variant="ghost" size="link" text="base" asChild>
                <Link href="/last-edited-document">
                  Go to web app <Icons.arrowRight className="ml-1" size={16} />
                </Link>
              </Button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
