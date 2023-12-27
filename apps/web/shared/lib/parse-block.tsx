import { cn } from "@lir/lib";
import { Emphasis, type BlockContent } from "@lir/lib/schema";

export function parseBlock(title: BlockContent["title"]) {
  // This should not happen.
  if (!title) return [];

  const result: React.ReactNode[] = [];

  for (const term of title) {
    const literal = term[0];
    const formats = term[1];

    if (!formats || !formats.length) {
      result.push(literal);
      continue;
    }

    const emphasis = formats[0];

    result.push(
      <span
        className={cn(
          emphasis.includes(Emphasis.Bold) && "font-bold",
          emphasis.includes(Emphasis.Italic) && "italic",
          emphasis.includes(Emphasis.Underline) && "underline",
          emphasis.includes(Emphasis.Strikethrough) && "line-through"
        )}
      >
        {literal}
      </span>
    );
  }

  return result;
}
