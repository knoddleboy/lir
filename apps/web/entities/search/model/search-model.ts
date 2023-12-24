import type { SearchInput } from "@lir/lib/schema";

import { create, type StateCreator } from "zustand";

type SearchMenuState = {
  searchMenuOpen: boolean;
  setSearchMenuOpen: (state: boolean) => void;
};

type SearchSortState = SearchInput["sort"] & {
  setSort: (sort: Partial<SearchInput["sort"]>) => void;
};

const createSearchMenuSlice: StateCreator<SearchMenuState> = (set) => ({
  searchMenuOpen: false,
  setSearchMenuOpen: (state) => set({ searchMenuOpen: state }),
});

const createSearchSortSlice: StateCreator<SearchSortState> = (set) => ({
  sortBy: "fixed",
  sortDirection: undefined,

  setSort: (sort) =>
    set((state) => {
      if (sort.sortBy === "fixed") {
        return {
          ...state,
          sortBy: "fixed",
          sortDirection: undefined,
        };
      }

      return {
        ...state,
        ...sort,
        sortDirection: sort.sortDirection ?? state.sortDirection ?? "asc",
      };
    }),
});

type SearchState = SearchMenuState & SearchSortState;

export const useSearchStore = create<SearchState>((...a) => ({
  ...createSearchMenuSlice(...a),
  ...createSearchSortSlice(...a),
}));
