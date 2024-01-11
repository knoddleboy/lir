// import { cn } from "@lir/lib";
// import { FontSizes, type FontSize } from "@lir/lib/schema";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   Button,
//   Icons,
//   DropdownMenuContent,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
// } from "@lir/ui";

// import { useMutation } from "@tanstack/react-query";
// import { useEffect, useState } from "react";

// import { blockApi, blockModel } from "~/entities/block";

// export const FontSizeSelect = () => {
//   const currentBlock = blockModel.useCurrentBlock();
//   const setBlock = blockModel.setBlock;

//   const { mutateAsync: updateFontSize } = useMutation({
//     mutationKey: blockApi.blockKeys.mutation.updateBlock(currentBlock?.id ?? ""),
//     mutationFn: blockApi.updateBlock,
//   });

//   const [fontSize, setFontSize] = useState<FontSize>(16);

//   useEffect(() => {
//     if (currentBlock) {
//       setFontSize(currentBlock.content.formats.fontSize as FontSize);
//     }
//   }, [currentBlock]);

//   const handleValueChange = async (newFontSize: FontSize) => {
//     setFontSize(newFontSize);

//     if (!currentBlock || currentBlock.content.formats.fontSize === newFontSize)
//       return;

//     const newContent = {
//       formats: {
//         ...currentBlock.content.formats,
//         fontSize: newFontSize,
//       },
//     };

//     setBlock({
//       id: currentBlock.id,
//       setType: "update",
//       content: newContent,
//     });

//     await updateFontSize({
//       id: currentBlock.id,
//       content: newContent,
//     });
//   };

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild disabled={!!!currentBlock}>
//         <Button
//           className={cn(
//             "border-muted-foreground/30 disabled:hover:bg-muted-foreground/30 hover:bg-muted-foreground/30 text-primary h-5 w-14 select-none justify-between rounded-sm border bg-transparent px-1 py-0 text-left text-xs transition-none hover:border-transparent",
//             !!!currentBlock && "opacity-40"
//           )}
//         >
//           {fontSize}
//           <Icons.chevronUpDown size={10} strokeWidth={3} />
//         </Button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent className="w-24 min-w-0">
//         <DropdownMenuRadioGroup
//           value={`${fontSize}`}
//           onValueChange={async (value) => {
//             await handleValueChange(+value as FontSize);
//           }}
//           className="font-medium [&>*]:py-0.5 [&>*]:pl-1.5 [&>*]:pr-2"
//         >
//           {FontSizes.map((size) => (
//             <DropdownMenuRadioItem key={size} value={`${size}`}>
//               {size}
//             </DropdownMenuRadioItem>
//           ))}
//         </DropdownMenuRadioGroup>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };
