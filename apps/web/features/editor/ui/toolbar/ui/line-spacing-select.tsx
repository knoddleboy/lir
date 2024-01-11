// import { cn } from "@lir/lib";
// import { LineSpacings, type LineSpacing } from "@lir/lib/schema";
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

// const LineSpacingSelectInner = () => {
//   const currentBlock = blockModel.useCurrentBlock();
//   const setBlock = blockModel.setBlock;

//   const { mutateAsync: updateBlockLineSpacing } = useMutation({
//     mutationKey: blockApi.blockKeys.mutation.updateBlock(currentBlock?.id ?? ""),
//     mutationFn: blockApi.updateBlock,
//   });

//   const [lineSpacing, setLineSpasing] = useState<LineSpacing>(1.2);

//   useEffect(() => {
//     if (currentBlock) {
//       setLineSpasing(currentBlock.content.lineSpacing as LineSpacing);
//     }
//   }, [currentBlock]);

//   const handleValueChange = async (newLineSpacing: LineSpacing) => {
//     setLineSpasing(newLineSpacing);

//     if (!currentBlock || currentBlock.content.lineSpacing === newLineSpacing) return;

//     setBlock({
//       id: currentBlock.id,
//       setType: "update",
//       content: {
//         lineSpacing: newLineSpacing,
//       },
//     });

//     await updateBlockLineSpacing({
//       id: currentBlock.id,
//       content: {
//         lineSpacing: newLineSpacing,
//       },
//     });
//   };

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild disabled={!!!currentBlock}>
//         <Button
//           className={cn(
//             "border-muted-foreground/30 disabled:hover:bg-muted-foreground/30 hover:bg-muted-foreground/30 text-primary h-5 w-12 select-none justify-between rounded-sm border bg-transparent px-1 py-0 text-left text-xs transition-none hover:border-transparent",
//             !!!currentBlock && "opacity-40"
//           )}
//         >
//           {lineSpacing.toFixed(1)}
//           <Icons.chevronUpDown size={10} strokeWidth={3} />
//         </Button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent className="w-20 min-w-0">
//         <DropdownMenuRadioGroup
//           value={`${lineSpacing}`}
//           onValueChange={async (value) => {
//             await handleValueChange(+value as LineSpacing);
//           }}
//           className="font-medium [&>*]:py-0.5 [&>*]:pl-1.5 [&>*]:pr-2"
//         >
//           {LineSpacings.map((spacing) => (
//             <DropdownMenuRadioItem key={spacing} value={`${spacing}`}>
//               {spacing.toFixed(1)}
//             </DropdownMenuRadioItem>
//           ))}
//         </DropdownMenuRadioGroup>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

// export const LineSpacingSelect = () => (
//   <div className="flex items-center">
//     <Icons.moveVertical
//       size={14}
//       strokeWidth={2}
//       className="text-accent-foreground opacity-60"
//     />
//     <LineSpacingSelectInner />
//   </div>
// );
