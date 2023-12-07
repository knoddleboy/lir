import { cn } from "@lir/lib";
import { Link } from "@lir/ui";

import NextLink from "next/link";

interface NavProps {
  classNames?: string;
}

export default function Nav({ classNames }: NavProps) {
  return (
    <nav className={cn(classNames)}>
      <div className="flex justify-between">
        <ul className="flex items-center gap-1"></ul>
        <ul className="flex shrink-0 items-center gap-4">
          <li>
            <Link variant="button-ghost" size="default-button" asChild>
              <NextLink href="/login">Log in</NextLink>
            </Link>
          </li>
          <li>
            <Link variant="button" size="default-button" asChild>
              <NextLink href="/signup">Sign up</NextLink>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
