import { cn } from "@lir/lib";
import { Alignment } from "@lir/lib/schema";
import { Button, Icons } from "@lir/ui";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { blockApi, blockModel } from "~/entities/block";

export const AlignmentFormats = () => {
  const currentBlock = blockModel.useCurrentBlock();
  const setBlock = blockModel.setBlock;

  const { mutateAsync: updateBlockAlignment } = useMutation({
    mutationKey: blockApi.blockKeys.mutation.updateBlock(currentBlock?.id ?? ""),
    mutationFn: blockApi.updateBlock,
  });

  const [alignment, setAlignment] = useState(Alignment.Left);

  useEffect(() => {
    if (currentBlock) {
      setAlignment(currentBlock.content.alignment);
    }
  }, [currentBlock]);

  const handleChangeAlignment = async (newAlignment: Alignment) => {
    setAlignment(newAlignment);

    if (!currentBlock) return;

    setBlock({
      id: currentBlock.id,
      setType: "update",
      content: {
        alignment: newAlignment,
      },
    });

    await updateBlockAlignment({
      id: currentBlock.id,
      content: {
        alignment: newAlignment,
      },
    });
  };

  return (
    <div
      className={cn("flex items-center gap-0.5", !!!currentBlock && "opacity-40")}
    >
      <Button
        variant="control-ghost"
        className={cn(
          "disabled:active:bg-control disabled:active:text-accent-foreground/60 h-[22px] w-6 rounded-sm p-0",
          alignment === Alignment.Left &&
            "bg-control-foreground text-accent-foreground hover:bg-control-foreground hover:text-accent-foreground"
        )}
        onClick={async () => {
          await handleChangeAlignment(Alignment.Left);
        }}
        disabled={!!!currentBlock}
      >
        <Icons.alignLeft size={16} />
      </Button>

      <Button
        variant="control-ghost"
        className={cn(
          "disabled:active:bg-control disabled:active:text-accent-foreground/60 h-[22px] w-6 rounded-sm p-0",
          alignment === Alignment.Center &&
            "bg-control-foreground text-accent-foreground hover:bg-control-foreground hover:text-accent-foreground"
        )}
        onClick={async () => {
          await handleChangeAlignment(Alignment.Center);
        }}
        disabled={!!!currentBlock}
      >
        <Icons.alignCenter size={16} />
      </Button>

      <Button
        variant="control-ghost"
        className={cn(
          "disabled:active:bg-control disabled:active:text-accent-foreground/60 h-[22px] w-6 rounded-sm p-0",
          alignment === Alignment.Right &&
            "bg-control-foreground text-accent-foreground hover:bg-control-foreground hover:text-accent-foreground"
        )}
        onClick={async () => {
          await handleChangeAlignment(Alignment.Right);
        }}
        disabled={!!!currentBlock}
      >
        <Icons.alignRight size={16} />
      </Button>

      <Button
        variant="control-ghost"
        className={cn(
          "disabled:active:bg-control disabled:active:text-accent-foreground/60 h-[22px] w-6 rounded-sm p-0",
          alignment === Alignment.Justify &&
            "bg-control-foreground text-accent-foreground hover:bg-control-foreground hover:text-accent-foreground"
        )}
        onClick={async () => {
          await handleChangeAlignment(Alignment.Justify);
        }}
        disabled={!!!currentBlock}
      >
        <Icons.alignJustify size={16} />
      </Button>
    </div>
  );
};
