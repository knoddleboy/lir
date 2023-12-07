import { cn } from "@lir/lib";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const linkVariants = cva(
  `inline-flex items-center justify-center whitespace-nowrap
   rounded-md text-base transition-colors focus-visible:outline-none
   disabled:pointer-events-none disabled:opacity-50 _ring`,
  {
    variants: {
      variant: {
        default: "text-primary underline-offset-4 hover:underline",
        "link-ghost": "text-primary",
        button: "bg-primary text-primary-foreground hover:bg-primary/90 font-medium",
        "button-ghost": "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "",
        "default-button": "h-8 px-2 leading-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  asChild?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    return (
      <Comp
        className={cn(linkVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Link.displayName = "Link";

export { Link, linkVariants };
