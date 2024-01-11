// import { cn } from "@lir/lib";
// // import { type BlockProps, BlockType, Alignment, Emphasis } from "@lir/lib/schema";

// import { useMutation } from "@tanstack/react-query";
// import { useRef, useEffect } from "react";

// // import { blockModel, blockApi } from "~/entities/block";
// import { getBlockLength, parseBlock } from "~/shared";

// type Props = {
//   block: any;
//   documentId: string;
// };

// export const Block = ({ block, documentId }: Props) => {
//   const ref = useRef<HTMLDivElement>(null);
//   const contentRef = useRef(parseBlock(block.content.title));

//   // const blocks = blockModel.useBlocks();
//   // const setBlock = blockModel.setBlock;
//   // const unsetBlock = blockModel.unsetBlock;
//   // const setCurrentBlock = blockModel.setCurrentBlock;

//   // const { mutateAsync: createBlock } = useMutation({
//   //   mutationKey: blockApi.blockKeys.mutation.createBlock(),
//   //   mutationFn: blockApi.createBlock,
//   //   onSuccess: (data) => {
//   //     setBlock({
//   //       setType: "set",
//   //       block: data,
//   //       prevId: block.id,
//   //     });
//   //   },
//   // });

//   // const { mutateAsync: deleteBlock } = useMutation({
//   //   mutationKey: blockApi.blockKeys.mutation.deleteBlock(),
//   //   mutationFn: blockApi.deleteBlock,
//   //   onSuccess: (data) => {
//   //     unsetBlock({
//   //       id: data.id,
//   //     });
//   //   },
//   // });

//   // const { mutateAsync: updateBlock } = useMutation({
//   //   mutationKey: blockApi.blockKeys.mutation.updateBlock(block.id),
//   //   mutationFn: blockApi.updateBlock,
//   //   onSuccess: (data) => {
//   //     setBlock({
//   //       setType: "update",
//   //       id: block.id,
//   //       content: data.content,
//   //     });
//   //   },
//   // });

//   // const handleKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
//   //   if (e.key === "Enter") {
//   //     e.preventDefault();

//   //     await createBlock({
//   //       type: BlockType.Text,
//   //       content: {
//   //         title: [[""]],
//   //         formats: {
//   //           emphasis: [],
//   //           fontSize: 16,
//   //         },
//   //         alignment: Alignment.Left,
//   //         lineSpacing: block.content.lineSpacing || 1.2,
//   //       },
//   //       documentId,
//   //       prevId: block.id,
//   //     });
//   //   }

//   //   if (e.key === "Delete" || e.key === "Backspace") {
//   //     if (!getBlockLength(block.content.title) && blocks.length > 1) {
//   //       await deleteBlock({
//   //         id: block.id,
//   //       });
//   //     }
//   //   }
//   // };

//   // const handleInput = async (e: React.FormEvent<HTMLDivElement>) => {
//   //   const blockInput = (e.target as HTMLElement).textContent ?? "";

//   //   await updateBlock({
//   //     id: block.id,
//   //     content: {
//   //       title: [[blockInput]],
//   //     },
//   //   });
//   // };

//   // useEffect(() => {
//   //   ref.current?.focus();
//   // }, []);

//   return (
//     <div
//       ref={ref}
//       // onBlur={() => setCurrentBlock(null)}
//       // onFocus={() => setCurrentBlock(block)}
//       // onKeyDown={handleKeyDown}
//       // onInput={handleInput}
//       data-block-id={block.id}
//       contentEditable={true}
//       spellCheck={true}
//       className={cn(
//         "w-full max-w-full whitespace-pre-wrap break-words py-1",
//         block.type === BlockType.Title &&
//           "mb-1 mt-8 text-[32px]" &&
//           block.content.formats.emphasis.includes(Emphasis.Bold) &&
//           "font-bold",
//         block.type === BlockType.Heading1 &&
//           "mt-6 text-[24px]" &&
//           block.content.formats.emphasis.includes(Emphasis.Bold) &&
//           "font-bold",
//         block.type === BlockType.Heading2 &&
//           "mt-4 text-[18px]" &&
//           block.content.formats.emphasis.includes(Emphasis.Bold) &&
//           "font-bold",

//         block.content.formats.emphasis.includes(Emphasis.Bold) && "font-bold",
//         block.content.formats.emphasis.includes(Emphasis.Italic) && "italic",
//         block.content.formats.emphasis.includes(Emphasis.Underline) && "underline",
//         block.content.formats.emphasis.includes(Emphasis.Strikethrough) &&
//           "line-through",

//         block.content.alignment === Alignment.Left && "text-left",
//         block.content.alignment === Alignment.Center && "text-center",
//         block.content.alignment === Alignment.Right && "text-right",
//         block.content.alignment === Alignment.Justify && "text-justify"
//       )}
//       style={{
//         fontSize: block.content.formats.fontSize,
//         lineHeight: block.content.lineSpacing,
//         WebkitUserModify: "read-write-plaintext-only",
//       }}
//       suppressContentEditableWarning
//     >
//       {contentRef.current.map((el) => el)}
//     </div>
//   );
// };
