import { cn } from "@lir/lib";
import { Emphasis } from "@lir/lib/schema";
import { Button } from "@lir/ui";

import { useState } from "react";

export const EmphasisFormats = () => {
  const [emphasis, setEmphasis] = useState<Emphasis[]>([Emphasis.Regular]);

  const handleClick = (emph: Emphasis) => {
    if (emphasis.includes(emph)) {
      setEmphasis((prev) => prev.filter((e) => e !== emph));
    } else {
      setEmphasis((prev) => [...prev, emph]);
    }
  };

  return (
    <div className="flex items-center gap-0.5">
      <Button
        variant="control-ghost"
        className={cn(
          "h-5 w-6 select-none rounded-sm p-1 font-extrabold",
          emphasis.includes(Emphasis.Bold) &&
            "bg-control-foreground text-accent-foreground hover:bg-control-foreground hover:text-accent-foreground"
        )}
        onClick={() => handleClick(Emphasis.Bold)}
      >
        B
      </Button>
      <Button
        variant="control-ghost"
        className={cn(
          "h-5 w-6 select-none rounded-sm p-1 font-serif font-medium italic",
          emphasis.includes(Emphasis.Italic) &&
            "bg-control-foreground text-accent-foreground hover:bg-control-foreground hover:text-accent-foreground"
        )}
        onClick={() => handleClick(Emphasis.Italic)}
      >
        I
      </Button>
      <Button
        variant="control-ghost"
        className={cn(
          "h-5 w-6 select-none rounded-sm p-1 font-medium underline",
          emphasis.includes(Emphasis.Underline) &&
            "bg-control-foreground text-accent-foreground hover:bg-control-foreground hover:text-accent-foreground"
        )}
        onClick={() => handleClick(Emphasis.Underline)}
      >
        U
      </Button>
      <Button
        variant="control-ghost"
        className={cn(
          "h-5 w-6 select-none rounded-sm p-1 font-medium line-through",
          emphasis.includes(Emphasis.Strikethrough) &&
            "bg-control-foreground text-accent-foreground hover:bg-control-foreground hover:text-accent-foreground"
        )}
        onClick={() => handleClick(Emphasis.Strikethrough)}
      >
        S
      </Button>
    </div>
  );
};
