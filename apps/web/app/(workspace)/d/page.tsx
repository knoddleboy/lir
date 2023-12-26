import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overview",
};

export default function OverviewPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-muted-foreground/60 select-none text-2xl">
        No document selected
      </div>
    </div>
  );
}
