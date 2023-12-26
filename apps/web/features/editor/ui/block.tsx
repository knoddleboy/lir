import { type BlockProps, BlockType } from "@lir/lib/schema";

import { useMutation } from "@tanstack/react-query";
import { useRef, useEffect } from "react";

import { blockModel, blockApi } from "~/entities/block";

type Props = {
  block: BlockProps;
  documentId: string;
};

export const Block = ({ block, documentId }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef(block.content);

  const setBlock = blockModel.setBlock;

  const { mutateAsync: createBlock } = useMutation({
    mutationKey: blockApi.blockKeys.mutation.createBlock(),
    mutationFn: blockApi.createBlock,
    onSuccess: (data) => {
      setBlock({
        setType: "set",
        block: data,
        prevId: block.id,
      });
    },
  });

  const { mutateAsync: updateBlock } = useMutation({
    mutationKey: blockApi.blockKeys.mutation.updateBlock(block.id),
    mutationFn: blockApi.updateBlock,
    onSuccess: (data) => {
      setBlock({
        setType: "update",
        id: block.id,
        content: data.content,
      });
    },
  });

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      await createBlock({
        type: BlockType.Text,
        content: "",
        documentId,
        prevId: block.id,
      });
    }
  };

  const handleInput = async (e: React.FormEvent<HTMLDivElement>) => {
    const content = (e.target as HTMLElement).textContent ?? "";

    await updateBlock({
      id: block.id,
      content,
    });
  };

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div
      ref={ref}
      onKeyDown={handleKeyDown}
      onInput={handleInput}
      data-block-id={block.id}
      contentEditable={true}
      spellCheck={true}
      className="w-full max-w-full whitespace-pre-wrap break-words"
      suppressContentEditableWarning
    >
      {contentRef.current}
    </div>
  );
};
