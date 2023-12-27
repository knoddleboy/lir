import { FontSizes, type FontSize } from "@lir/lib/schema";
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

export const FontSizeSelect = () => {
  const [fontSize, setFontSize] = useState<FontSize>(12);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="border-muted-foreground/30 hover:bg-muted-foreground/30 text-primary h-5 w-14 select-none justify-between rounded-sm border bg-transparent px-1 py-0 text-left text-xs transition-none hover:border-transparent">
          {fontSize}
          <Icons.chevronUpDown size={10} strokeWidth={3} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-24 min-w-0">
        <DropdownMenuRadioGroup
          value={`${fontSize}`}
          onValueChange={(value) => {
            setFontSize(+value as FontSize);
          }}
          className="font-medium [&>*]:py-0.5 [&>*]:pl-1.5 [&>*]:pr-2"
        >
          {FontSizes.map((size) => (
            <DropdownMenuRadioItem key={size} value={`${size}`}>
              {size}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
