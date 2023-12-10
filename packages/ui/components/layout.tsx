import { cn } from "@lir/lib";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export const Layout = ({ className, children }: Props) => (
  <main className={cn("flex h-screen w-screen flex-col", className)}>
    <div className="container flex-1">{children}</div>
  </main>
);
