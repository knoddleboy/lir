import { BlockType } from "@lir/lib/schema";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  Button,
  Icons,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@lir/ui";

import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";

import { blockModel, blockApi } from "~/entities/block";

const blockTypeMapping: Record<BlockType, string> = {
  [BlockType.Title]: "Title",
  [BlockType.Heading1]: "Heading 1",
  [BlockType.Heading2]: "Heading 2",
  [BlockType.Text]: "No Style",
};

export const BlockTypeSelect = () => {
  const currentBlock = blockModel.useCurrentBlock();
  const setBlock = blockModel.setBlock;

  const { mutateAsync: updateBlockType } = useMutation({
    mutationKey: blockApi.blockKeys.mutation.updateBlock(currentBlock?.id ?? ""),
    mutationFn: blockApi.updateBlock,
  });

  const [type, setType] = useState<BlockType>(BlockType.Text);

  useEffect(() => {
    if (currentBlock) {
      setType(currentBlock.type);
    }
  }, [currentBlock]);

  const handleValueChange = async (newType: BlockType) => {
    setType(newType);

    if (!currentBlock || currentBlock.type === newType) return;

    setBlock({
      id: currentBlock.id,
      setType: "update",
      type: newType,
    });

    await updateBlockType({
      id: currentBlock.id,
      type: newType,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="border-muted-foreground/30 hover:bg-muted-foreground/30 text-primary h-5 w-48 select-none justify-between rounded-sm border bg-transparent px-1 py-0 text-left text-xs transition-none hover:border-transparent">
          {blockTypeMapping[type]}
          <Icons.chevronDown size={12} strokeWidth={3} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48">
        <DropdownMenuRadioGroup
          value={type}
          onValueChange={async (value) => {
            await handleValueChange(value as BlockType);
          }}
        >
          <div className="[&>*]:py-0.5 [&>*]:pl-1.5 [&>*]:pr-2">
            <DropdownMenuRadioItem
              value={BlockType.Text}
              className="text-accent-foreground text-xs"
            >
              {blockTypeMapping[BlockType.Text]}
            </DropdownMenuRadioItem>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuLabel className="text-accent-foreground/40 select-none px-2 py-1 text-xs font-bold">
            Paragraph Styles
          </DropdownMenuLabel>

          <div className="[&>*]:py-0.5 [&>*]:pl-1.5 [&>*]:pr-2">
            <DropdownMenuRadioItem
              value={BlockType.Title}
              className="text-2xl font-bold"
            >
              {blockTypeMapping[BlockType.Title]}
            </DropdownMenuRadioItem>

            <DropdownMenuRadioItem
              value={BlockType.Heading1}
              className="text-lg font-bold"
            >
              {blockTypeMapping[BlockType.Heading1]}
            </DropdownMenuRadioItem>

            <DropdownMenuRadioItem
              value={BlockType.Heading2}
              className="text-base font-semibold"
            >
              {blockTypeMapping[BlockType.Heading2]}
            </DropdownMenuRadioItem>
          </div>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
