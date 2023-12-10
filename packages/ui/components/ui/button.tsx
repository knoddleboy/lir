import { cn } from "@lir/lib";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  `inline-flex items-center justify-center whitespace-nowrap
   rounded-md transition-colors disabled:cursor-not-allowed _ring`,
  {
    variants: {
      variant: {
        default: `bg-primary font-medium text-primary-foreground
         hover:bg-primary/90 disabled:hover:bg-primary disabled:opacity-30`,
        // destructive:
        //   "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        // outline:
        //   "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        // secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        "control-ghost": `text-accent-foreground/60 active:text-accent-foreground 
        hover:bg-control active:bg-control-foreground transition-none`,

        link: "text-primary underline-offset-4 hover:underline",
        "link-ghost": "text-primary",
      },
      size: {
        default: "h-9 px-3 py-2",
        link: "h-8 px-2 leading-8",
        "link-ghost": "",
        // sm: "h-9 rounded-md px-3",
        // lg: "h-11 rounded-md px-8",
        icon: "h-7 w-8",
      },
      text: {
        sm: "text-sm",
        base: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      text: "sm",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, text, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, text, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
