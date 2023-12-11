"use client";

import { Button, Icons } from "@lir/ui";

import { useRouter } from "next/navigation";

export const GoBack = () => {
  const router = useRouter();

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
