import type { BlockContent } from "@lir/lib/schema";

export function getBlockLength(title: BlockContent["title"]) {
  if (!title) return 0;

  if (title.length > 1) return title.length;

  if (!title[0][0].length) return 0;

  return 1;
}
