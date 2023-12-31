"use client";

import {
  BlockTypeSelect,
  EmphasisSelect,
  FontSizeSelect,
  EmphasisFormats,
  AlignmentFormats,
  LineSpacingSelect,
} from "./ui";

export const Toolbar = () => {
  return (
    <div className="ml-[26px] flex w-full items-center gap-2">
      <BlockTypeSelect />
      <EmphasisSelect />
      <FontSizeSelect />
      <EmphasisFormats />
      <AlignmentFormats />
      <LineSpacingSelect />
    </div>
  );
};
