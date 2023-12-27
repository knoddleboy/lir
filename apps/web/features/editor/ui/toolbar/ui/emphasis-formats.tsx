import { cn } from "@lir/lib";
import { Emphasis } from "@lir/lib/schema";
import { Button } from "@lir/ui";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { blockApi, blockModel } from "~/entities/block";

export const EmphasisFormats = () => {
  const currentBlock = blockModel.useCurrentBlock();
  const setBlock = blockModel.setBlock;

  const { mutateAsync: updateBlockEmphasis } = useMutation({
    mutationKey: blockApi.blockKeys.mutation.updateBlock(currentBlock?.id ?? ""),
    mutationFn: blockApi.updateBlock,
  });

  const [emphasis, setEmphasis] = useState<Emphasis[]>([]);

  useEffect(() => {
    if (currentBlock) {
      setEmphasis(currentBlock.content.formats.emphasis);
    }
  }, [currentBlock]);

  const handleClick = async (emph: Emphasis) => {
    let newEmphasis = [...emphasis];

    if (emphasis.includes(emph)) {
      newEmphasis = newEmphasis.filter((e) => e !== emph);
    } else {
      newEmphasis.push(emph);
    }

    if (emphasis.includes(Emphasis.Underline) && emph === Emphasis.Strikethrough) {
      newEmphasis = newEmphasis.filter((e) => e !== Emphasis.Underline);
    }

    if (emphasis.includes(Emphasis.Strikethrough) && emph === Emphasis.Underline) {
      newEmphasis = newEmphasis.filter((e) => e !== Emphasis.Strikethrough);
    }

    setEmphasis(newEmphasis);

    if (currentBlock) {
      const newContent = {
        formats: {
          ...currentBlock.content.formats,
          emphasis: newEmphasis,
        },
      };

      setBlock({
        id: currentBlock.id,
        setType: "update",
        content: newContent,
      });

      await updateBlockEmphasis({
        id: currentBlock.id,
        content: newContent,
      });
    }

    // if (currentBlock) {
    //   const { start, end } = getCursorPositions();
    //   setBlock({
    //     id: currentBlock.id,
    //     setType: "update",
    //     content: {
    //       title: splitBlocks(currentBlock.content.title, start, end, newEmphasis),
    //     },
    //   });
    // }
  };

  return (
    <div
      className={cn("flex items-center gap-0.5", !!!currentBlock && "opacity-40")}
    >
      <Button
        variant="control-ghost"
        className={cn(
          "disabled:active:bg-control disabled:active:text-accent-foreground/60 h-5 w-6 select-none rounded-sm p-1 font-extrabold",
          emphasis.includes(Emphasis.Bold) &&
            "bg-control-foreground text-accent-foreground hover:bg-control-foreground hover:text-accent-foreground"
        )}
        onClick={async () => {
          await handleClick(Emphasis.Bold);
        }}
        disabled={!!!currentBlock}
      >
        B
      </Button>
      <Button
        variant="control-ghost"
        className={cn(
          "disabled:active:bg-control disabled:active:text-accent-foreground/60 h-5 w-6 select-none rounded-sm p-1 font-serif font-medium italic",
          emphasis.includes(Emphasis.Italic) &&
            "bg-control-foreground text-accent-foreground hover:bg-control-foreground hover:text-accent-foreground"
        )}
        onClick={async () => {
          await handleClick(Emphasis.Italic);
        }}
        disabled={!!!currentBlock}
      >
        I
      </Button>
      <Button
        variant="control-ghost"
        className={cn(
          "disabled:active:bg-control disabled:active:text-accent-foreground/60 h-5 w-6 select-none rounded-sm p-1 font-medium underline",
          emphasis.includes(Emphasis.Underline) &&
            "bg-control-foreground text-accent-foreground hover:bg-control-foreground hover:text-accent-foreground"
        )}
        onClick={async () => {
          await handleClick(Emphasis.Underline);
        }}
        disabled={!!!currentBlock}
      >
        U
      </Button>
      <Button
        variant="control-ghost"
        className={cn(
          "disabled:active:bg-control disabled:active:text-accent-foreground/60 h-5 w-6 select-none rounded-sm p-1 font-medium line-through",
          emphasis.includes(Emphasis.Strikethrough) &&
            "bg-control-foreground text-accent-foreground hover:bg-control-foreground hover:text-accent-foreground"
        )}
        onClick={async () => {
          await handleClick(Emphasis.Strikethrough);
        }}
        disabled={!!!currentBlock}
      >
        S
      </Button>
    </div>
  );
};

// function getCursorPositions() {
//   let cursorPosition = { start: 0, end: 0 };

//   if (window.getSelection) {
//     // For contenteditable elements and textareas
//     const selection = window.getSelection();
//     if (selection && selection.rangeCount > 0) {
//       const range = selection.getRangeAt(0);
//       cursorPosition.start = range.startOffset;
//       cursorPosition.end = range.endOffset;
//     }
//   }

//   return cursorPosition;
// }

// function splitBlocks(
//   input: BlockContent["title"],
//   start: number,
//   end: number,
//   formats: Emphasis[]
// ): BlockContent["title"] {
//   let result: BlockContent["title"] = [];
//   let currentStart = 0;

//   for (let i = 0; i < input.length; i++) {
//     const currentText = input[i][0];
//     const currentFormats = input[i][1];
//     const newFormats = currentFormats ? [...currentFormats, formats] : [formats];
//     const currentEnd = currentStart + currentText.length;

//     if (start >= currentStart && start <= currentEnd) {
//       // Split at the start position
//       const firstPart = currentText.substring(0, start - currentStart);
//       const secondPart = currentText.substring(start - currentStart);

//       if (firstPart.length > 0) {
//         result.push(
//           currentFormats?.length ? [firstPart, currentFormats] : [firstPart]
//         );
//       }
//       result.push([secondPart, newFormats]); // with new formats

//       // Check for the end position
//       if (end <= currentEnd) {
//         // Split at the end position
//         const thirdPart = secondPart.substring(0, end - start);
//         const fourthPart = secondPart.substring(end - start);

//         result.pop(); // Remove the secondPart
//         if (thirdPart.length > 0) {
//           result.push([thirdPart, newFormats]); // with new formats
//         }
//         if (fourthPart.length > 0) {
//           // result.push([fourthPart, currentFormats]);
//           result.push(
//             currentFormats?.length ? [fourthPart, currentFormats] : [fourthPart]
//           );
//         }

//         // Append remaining arrays to the result
//         for (let j = i + 1; j < input.length; j++) {
//           result.push(input[j]);
//         }

//         return result;
//       }
//     } else {
//       // Start is not in the current array
//       result.push(input[i]);

//       // Check for the end position
//       if (end <= currentEnd) {
//         const endPart = currentText.substring(0, end - currentStart);
//         const remainingPart = currentText.substring(end - currentStart);

//         if (endPart.length > 0) {
//           result.pop(); // Remove the last added array
//           result.push([endPart, newFormats]); // with new formats
//         }
//         if (remainingPart.length > 0) {
//           // result.push([remainingPart, currentFormats]);
//           result.push(
//             currentFormats?.length
//               ? [remainingPart, currentFormats]
//               : [remainingPart]
//           );
//         }

//         // Append remaining arrays to the result
//         for (let j = i + 1; j < input.length; j++) {
//           result.push(input[j]);
//         }

//         return result;
//       }
//     }

//     currentStart = currentEnd;
//   }

//   return result;
// }
