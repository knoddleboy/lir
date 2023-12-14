import { create } from "zustand";

type SearchState = {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
};

export const useSearchStore = create<SearchState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
