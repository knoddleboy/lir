import { Emphasis } from "@lir/lib/schema";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  Button,
  Icons,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@lir/ui";

import { useState } from "react";

const emphasisMapping: Record<Emphasis, string> = {
  [Emphasis.Regular]: "Regular",
  [Emphasis.Bold]: "Bold",
  [Emphasis.Italic]: "Italic",
  [Emphasis.Underline]: "Underline",
  [Emphasis.Strikethrough]: "Strikethrough",
};

export const EmphasisSelect = () => {
  const [emphasis, setEmphasis] = useState<Emphasis>(Emphasis.Regular);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="border-muted-foreground/30 hover:bg-muted-foreground/30 text-primary h-5 w-24 select-none justify-between rounded-sm border bg-transparent px-1 py-0 text-left text-xs transition-none hover:border-transparent">
          {emphasisMapping[emphasis]}
          <Icons.chevronUpDown size={10} strokeWidth={3} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-28 min-w-0">
        <DropdownMenuRadioGroup
          value={emphasis}
          onValueChange={(value) => {
            setEmphasis(value as Emphasis);
          }}
        >
          <div className="[&>*]:py-0.5 [&>*]:pl-1.5 [&>*]:pr-2">
            <DropdownMenuRadioItem value={Emphasis.Regular}>
              {emphasisMapping[Emphasis.Regular]}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={Emphasis.Bold} className="font-bold">
              {emphasisMapping[Emphasis.Bold]}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={Emphasis.Italic} className="italic">
              {emphasisMapping[Emphasis.Italic]}
            </DropdownMenuRadioItem>
          </div>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
