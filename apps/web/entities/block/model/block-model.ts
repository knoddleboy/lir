import type {
  BlockProps,
  DeleteBlockInput,
  UpdateBlockInput,
} from "@lir/lib/schema";

import { type StateCreator, create, useStore } from "zustand";

type UpdateInput =
  | ({ setType: "update" } & UpdateBlockInput)
  | { setType: "set"; block: BlockProps; prevId: string };

type BlockState = {
  blocks: BlockProps[];
  setBlock: (updateInput: UpdateInput) => void;
  setBlocks: (blocks: BlockProps[]) => void;
  unsetBlock: (deleteInput: DeleteBlockInput) => void;
};

type CurrentBlockState = {
  currentBlock: BlockProps | null;
  setCurrentBlock: (blockId: BlockProps | null) => void;
};

const createBlockSlice: StateCreator<BlockState> = (set) => ({
  blocks: [],

  setBlock: (updateInput) => {
    set((state) => {
      switch (updateInput.setType) {
        case "update":
          return {
            blocks: state.blocks.map((block) => {
              if (block.id !== updateInput.id) {
                return block;
              }

              return {
                ...block,
                ...updateInput,
                content: {
                  ...block.content,
                  ...updateInput.content,
                },
              };
            }),
          };

        case "set":
          // before set: blockN -> blockN+1 -> ...
          // after set with blockN as previous:
          // blockN -> blockNEW -> blockN+1 -> ...

          const prev = state.blocks.findIndex(
            (block) => block.id === updateInput.prevId
          );

          return {
            blocks: state.blocks.toSpliced(prev + 1, 0, updateInput.block),
          };

        default:
          throw new Error();
      }
    });
  },

  setBlocks: (blocks) => {
    set((state) => ({
      blocks: blocks.length ? [...state.blocks, ...blocks] : [],
    }));
  },

  unsetBlock: ({ id }) => {
    set((state) => ({
      blocks: state.blocks.filter((block) => block.id !== id),
    }));
  },
});

const createCurrentBlockSlice: StateCreator<CurrentBlockState> = (set) => ({
  currentBlock: null,

  setCurrentBlock: (blockId) => {
    set({ currentBlock: blockId });
  },
});

export const blockStore = create<BlockState & CurrentBlockState>((...a) => ({
  ...createBlockSlice(...a),
  ...createCurrentBlockSlice(...a),
}));

export const useBlock = (id: string) =>
  useStore(blockStore, (state) => state.blocks.find((block) => block.id === id));

export const useBlocks = () => useStore(blockStore, (state) => state.blocks);

export const setBlock = (updateInput: UpdateInput) =>
  blockStore.getState().setBlock(updateInput);

export const setBlocks = (blocks: BlockProps[]) =>
  blockStore.getState().setBlocks(blocks);

export const unsetBlock = (deleteInput: DeleteBlockInput) =>
  blockStore.getState().unsetBlock(deleteInput);

export const useCurrentBlock = () =>
  useStore(blockStore, (state) => state.currentBlock);

export const setCurrentBlock = (block: BlockProps | null) =>
  blockStore.getState().setCurrentBlock(block);
