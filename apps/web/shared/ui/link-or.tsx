import * as React from "react";

import Link from "next/link";

type LinkOrProps = {
  href?: string;
  slot?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export const LinkOr = React.forwardRef<HTMLElement, LinkOrProps>(
  ({ href, slot = "div", children, ...passThrough }, ref) => {
    const Slot = slot as React.ElementType;

    return href ? (
      <Link
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        href={href}
        {...passThrough}
      >
        {children}
      </Link>
    ) : (
      <Slot ref={ref} {...passThrough}>
        {children}
      </Slot>
    );
  }
);
LinkOr.displayName = "LinkOr";
