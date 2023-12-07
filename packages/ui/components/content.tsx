import { cn } from "@lir/lib";

interface ContentProps {
  className?: string;
  children?: React.ReactNode;
}

export const Content = ({ className, children }: ContentProps) => (
  <main className={cn("flex h-screen w-screen flex-col", className)}>
    <div className="container flex-1">{children}</div>
  </main>
);
