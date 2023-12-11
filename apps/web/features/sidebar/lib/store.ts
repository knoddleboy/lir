import { create } from "zustand";

type SidebarState = {
  isOpened: boolean;
  shouldAnimate: boolean;
  setIsOpened: (isOpened: boolean, shouldAnimate?: boolean) => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpened: true,
  shouldAnimate: false,
  setIsOpened: (isOpened, shouldAnimate = false) => set({ isOpened, shouldAnimate }),
}));
