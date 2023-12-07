import { cn } from "@lir/lib";

import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, autoComplete, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `border-input bg-background placeholder:text-muted-foreground
           _ring flex h-9 w-full rounded-md border px-3 py-2 text-sm
           file:border-0 file:bg-transparent file:text-sm file:font-medium
           disabled:cursor-not-allowed disabled:opacity-50`,
          className
        )}
        ref={ref}
        autoComplete={autoComplete || "off"}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
