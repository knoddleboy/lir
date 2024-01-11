// import { Block } from "@prisma/client";

// export function traverseBlockArray(blocks: Block[]) {
//   if (!blocks.length) return [];

//   const result: Block[] = [];
//   const blockMap = new Map<Block["nextId"], Block>();

//   // Build a map for quick access
//   for (const block of blocks) {
//     if (block.nextId === null) {
//       continue;
//     }

//     blockMap.set(block.nextId, block);
//   }

//   let curr = blocks.find((block) => block.nextId === null);

//   while (curr) {
//     result.unshift(curr);
//     curr = blockMap.get(curr.id);
//   }

//   return result;
// }
