"use client";

import { Skeleton } from "@lir/ui";

import { useIsMounted } from "~/shared";

import {
  BlockTypeSelect,
  MarkSelect,
  FontSizeSelect,
  MarkFormats,
  AlignmentFormats,
  LineSpacingSelect,
} from "./ui";

export const Toolbar = () => {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return <Skeleton className="h-6 w-full" />;
  }

  return (
    <div className="ml-[26px] flex w-full items-center gap-2">
      <BlockTypeSelect />
      <MarkSelect />
      <FontSizeSelect />
      <MarkFormats />
      <AlignmentFormats />
      <LineSpacingSelect />
    </div>
  );
};
