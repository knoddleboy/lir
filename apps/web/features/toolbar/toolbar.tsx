"use client";

import {
  BlockTypeSelect,
  MarkSelect,
  FontSizeSelect,
  MarkFormats,
  AlignmentFormats,
  LineSpacingSelect,
} from "./ui";

export const Toolbar = () => {
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
