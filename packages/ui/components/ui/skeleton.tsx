import { cn } from "@lir/lib";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("bg-control animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
