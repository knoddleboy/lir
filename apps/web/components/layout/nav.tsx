import { cn } from "@lir/lib";
import { Button } from "@lir/ui";

import Link from "next/link";

type Props = {
  classNames?: string;
};

export default function Nav({ classNames }: Props) {
  return (
    <nav className={cn(classNames)}>
      <div className="flex justify-between">
        <ul className="flex items-center gap-1"></ul>
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
      </div>
    </nav>
  );
}
