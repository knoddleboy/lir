"use client";

import { Button, Icons, Skeleton } from "@lir/ui";

import { useRouter } from "next/navigation";

import { useIsMounted } from "~/shared";

export const GoBack = () => {
  const router = useRouter();

  const isMounted = useIsMounted();

  if (!isMounted) {
    return <Skeleton className="mr-1 h-6 w-6" />;
  }

  return (
    <Button
      className="h-7 w-7 p-1"
      variant="control-ghost"
      onClick={() => router.back()}
    >
      <Icons.chevronLeft className="w-full" />
    </Button>
  );
};
