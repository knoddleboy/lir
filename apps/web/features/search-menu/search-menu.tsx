import type { DocumentProps } from "@lir/lib/schema";
import { Button, Dialog, DialogContent, Icons, Separator } from "@lir/ui";

import { useRef } from "react";
import { HotkeysProvider, useHotkeys } from "react-hotkeys-hook";

import { searchModel } from "~/entities/search";
import { formatResultString } from "~/shared";

import { useSearchDocuments } from "./api";
import { SearchBar } from "./ui/search-bar";
import { SearchFilters } from "./ui/search-filters";
import { SearchResult } from "./ui/search-results";

const SearchDialog = () => {
  const { mutateAsync: searchDocuments, data: searchResults } = useSearchDocuments();

  const previousSearchQuery = useRef<string>("");
  const previousSearchResults = useRef<DocumentProps[] | null>(null);
  const previousSearchResultsLength = useRef<number>(0);

  const { searchMenuOpen, setSearchMenuOpen, sortBy, sortDirection } =
    searchModel.useSearchStore();

  useHotkeys(
    "mod+p",
    () => setSearchMenuOpen(!searchMenuOpen),
    {
      preventDefault: true,
      enableOnContentEditable: true,
      enableOnFormTags: ["input", "select", "textarea"],
    },
    [searchMenuOpen]
  );

  const handleSearchBarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    if (!query.length) return;

    const found = await searchDocuments({
      query,
      sort: {
        sortBy,
        sortDirection,
      },
    });

    previousSearchQuery.current = query;
    previousSearchResults.current = found;
    previousSearchResultsLength.current = found.length;
  };

  return (
    <Dialog open={searchMenuOpen} onOpenChange={setSearchMenuOpen}>
      <DialogContent
        withCloseButton={false}
        animateSlideY={false}
        className="top-[min(15%,100px)] flex h-auto max-h-[max(50vh,384px)] max-w-xl translate-y-[0%] flex-col gap-0 overflow-hidden !rounded-xl p-0 outline-none"
      >
        <SearchBar
          defaultValue={previousSearchQuery.current}
          onChange={handleSearchBarChange}
        />
        <Separator />

        <div className="text-accent-foreground/60 flex justify-between py-1 pl-4 pr-3 text-sm font-medium">
          <div className="py-0.5">
            {formatResultString(
              searchResults
                ? searchResults.length
                : previousSearchResultsLength.current
                  ? previousSearchResultsLength.current
                  : 0
            )}
          </div>

          <SearchFilters>
            <Button variant="control-ghost" size="control-icon" className="h-6">
              <Icons.arrowUpDown size={16} />
            </Button>
          </SearchFilters>
        </div>

        <SearchResult
          result={
            searchResults
              ? searchResults
              : previousSearchResults.current
                ? previousSearchResults.current
                : []
          }
        />
      </DialogContent>
    </Dialog>
  );
};

export const SearchMenu = () => (
  <HotkeysProvider initiallyActiveScopes={["search-menu"]}>
    <SearchDialog />
  </HotkeysProvider>
);
