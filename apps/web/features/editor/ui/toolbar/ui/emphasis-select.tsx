// import { cn } from "@lir/lib";
// import { Emphasis } from "@lir/lib/schema";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   Button,
//   Icons,
//   DropdownMenuContent,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuSeparator,
// } from "@lir/ui";

// import { useMutation } from "@tanstack/react-query";
// import { useEffect, useState } from "react";

// import { blockApi, blockModel } from "~/entities/block";

// const emphasisMapping: Record<Emphasis | "Other", string> = {
//   [Emphasis.Regular]: "Regular",
//   [Emphasis.Bold]: "Bold",
//   [Emphasis.Italic]: "Italic",
//   [Emphasis.Underline]: "Underline",
//   [Emphasis.Strikethrough]: "Strikethrough",
//   Other: "Other",
// };

// export const EmphasisSelect = () => {
//   const currentBlock = blockModel.useCurrentBlock();
//   const setBlock = blockModel.setBlock;

//   const { mutateAsync: updateBlockEmphasis } = useMutation({
//     mutationKey: blockApi.blockKeys.mutation.updateBlock(currentBlock?.id ?? ""),
//     mutationFn: blockApi.updateBlock,
//   });

//   const [emphasis, setEmphasis] = useState<Emphasis | "Other">(Emphasis.Regular);

//   useEffect(() => {
//     if (currentBlock) {
//       const currentEmphasis = currentBlock.content.formats.emphasis;
//       if (currentEmphasis.length > 1) {
//         setEmphasis("Other");
//       } else {
//         if (!currentEmphasis[0]?.length) {
//           setEmphasis(Emphasis.Regular);
//           return;
//         }

//         if (
//           currentEmphasis[0] === Emphasis.Underline ||
//           currentEmphasis[0] === Emphasis.Strikethrough
//         ) {
//           setEmphasis("Other");
//         } else {
//           setEmphasis(currentEmphasis[0]);
//         }
//       }
//     }
//   }, [currentBlock]);

//   const handleValueChange = async (newEmphasis: Emphasis | "Other") => {
//     setEmphasis(newEmphasis);

//     if (newEmphasis === "Other") return;

//     if (currentBlock) {
//       const newContent = {
//         formats: {
//           ...currentBlock.content.formats,
//           emphasis: newEmphasis === Emphasis.Regular ? [] : [newEmphasis],
//         },
//       };

//       setBlock({
//         id: currentBlock.id,
//         setType: "update",
//         content: newContent,
//       });

//       await updateBlockEmphasis({
//         id: currentBlock.id,
//         content: newContent,
//       });
//     }
//   };

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild disabled={!!!currentBlock}>
//         <Button
//           className={cn(
//             "border-muted-foreground/30 disabled:hover:bg-muted-foreground/30 hover:bg-muted-foreground/30 text-primary h-5 w-24 select-none justify-between rounded-sm border bg-transparent px-1 py-0 text-left text-xs transition-none hover:border-transparent",
//             !!!currentBlock && "opacity-40"
//           )}
//         >
//           {emphasisMapping[emphasis]}
//           <Icons.chevronUpDown size={10} strokeWidth={3} />
//         </Button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent className="w-28 min-w-0">
//         <DropdownMenuRadioGroup
//           value={emphasis}
//           onValueChange={async (value) => {
//             await handleValueChange(value as Emphasis | "Other");
//           }}
//         >
//           <div className="[&>*]:py-0.5 [&>*]:pl-1.5 [&>*]:pr-2">
//             <DropdownMenuRadioItem value={Emphasis.Regular}>
//               {emphasisMapping[Emphasis.Regular]}
//             </DropdownMenuRadioItem>

//             <DropdownMenuRadioItem value={Emphasis.Bold} className="font-bold">
//               {emphasisMapping[Emphasis.Bold]}
//             </DropdownMenuRadioItem>

//             <DropdownMenuRadioItem value={Emphasis.Italic} className="italic">
//               {emphasisMapping[Emphasis.Italic]}
//             </DropdownMenuRadioItem>
//           </div>

//           <DropdownMenuSeparator />

//           <div className="[&>*]:py-0.5 [&>*]:pl-1.5 [&>*]:pr-2">
//             <DropdownMenuRadioItem value={"Other"} disabled>
//               Other
//             </DropdownMenuRadioItem>
//           </div>
//         </DropdownMenuRadioGroup>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };
