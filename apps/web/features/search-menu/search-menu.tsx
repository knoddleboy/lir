import type { DocumentProps } from "@lir/lib/schema";
import { Button, Dialog, DialogContent, Icons, Separator } from "@lir/ui";

import { useState, useRef, useEffect } from "react";
import { HotkeysProvider, useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";

import { searchModel } from "~/entities/search";
import { sessionModel } from "~/entities/session";
import { formatResultString } from "~/shared";

import { useSearchDocuments } from "./api";
import { SearchBar } from "./ui/search-bar";
import { SearchFilters } from "./ui/search-filters";
import { SearchResult } from "./ui/search-results";

const SearchDialog = () => {
  const isAuth = sessionModel.useAuth();
  const { searchMenuOpen, setSearchMenuOpen, sortBy, sortDirection } =
    searchModel.useSearchStore();
  const filtersChanged = useRef(false);

  const {
    mutateAsync: searchDocuments,
    data: searchResults,
    isPending,
  } = useSearchDocuments();
  const foundDocuments = searchResults?.documents;

  const previousSearchQuery = useRef<string>("");
  const previousSearchResults = useRef<DocumentProps[] | null>(null);
  const hasMore = useRef(true);

  const [debouncedIsPending, setDebouncedIsPending] = useState(false);
  const [resultMessage, setResultMessage] = useState<string>(formatResultString(0));

  useHotkeys(
    "mod+p",
    () => {
      if (isAuth) {
        setSearchMenuOpen(!searchMenuOpen);
      } else {
        toast.info("Searching is available only for signed in users.");
      }
    },
    {
      preventDefault: true,
      enableOnContentEditable: true,
      enableOnFormTags: ["input", "select", "textarea"],
    },
    [isAuth, searchMenuOpen]
  );

  const fetchDocuments = async (query: string, fetchMore?: boolean) => {
    if (
      !filtersChanged.current &&
      query === previousSearchQuery.current &&
      !fetchMore
    )
      return;

    const isNewQuery =
      query !== previousSearchQuery.current || filtersChanged.current;
    let nextSkip = 0;

    if (isNewQuery) {
      previousSearchQuery.current = query;
      hasMore.current = true;
    } else {
      nextSkip = previousSearchResults.current?.length || 0;
    }

    if (!hasMore.current) return;

    const { documents, total } = await searchDocuments({
      query,
      sort: {
        sortBy,
        sortDirection,
      },
      skip: nextSkip,
      take: 20,
    });

    if (filtersChanged.current) {
      filtersChanged.current = false;
    }

    if (documents.length < 20) {
      hasMore.current = false;
    }

    previousSearchResults.current = [
      ...(isNewQuery ? [] : previousSearchResults.current || []),
      ...documents,
    ];

    if (documents.length === total) {
      setResultMessage(formatResultString(total));
    } else {
      const paginatedCount =
        previousSearchResults.current?.length || documents.length;
      setResultMessage(`${paginatedCount} of ${formatResultString(total)}`);
    }
  };

  useEffect(() => {
    filtersChanged.current = true;
  }, [sortBy, sortDirection]);

  useEffect(() => {
    if (isPending === true) {
      const timer = setTimeout(() => setDebouncedIsPending(isPending), 500);

      return () => {
        clearTimeout(timer);
      };
    }

    setDebouncedIsPending(false);
  }, [isPending]);

  return (
    <Dialog open={searchMenuOpen} onOpenChange={setSearchMenuOpen}>
      <DialogContent
        withCloseButton={false}
        animateSlideY={false}
        className="top-[min(15%,100px)] flex h-auto max-h-[max(50vh,384px)] max-w-xl translate-y-[0%] flex-col gap-0 overflow-hidden !rounded-xl p-0 outline-none"
      >
        <SearchMenuInner
          foundDocuments={foundDocuments}
          previousSearchQuery={previousSearchQuery.current}
          previousSearchResults={previousSearchResults.current}
          resultMessage={resultMessage}
          isPending={debouncedIsPending}
          fetchDocuments={fetchDocuments}
        />
      </DialogContent>
    </Dialog>
  );
};

type SearchMenuInnerProps = {
  foundDocuments: DocumentProps[] | undefined;
  previousSearchQuery: string;
  previousSearchResults: DocumentProps[] | null;
  resultMessage: string;
  isPending: boolean;
  fetchDocuments: (query: string, fetchMore?: boolean) => Promise<void>;
};

const SearchMenuInner = ({
  foundDocuments,
  previousSearchQuery,
  previousSearchResults,
  resultMessage,
  isPending,
  fetchDocuments,
}: SearchMenuInnerProps) => {
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const searchResultListRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const searchResultList = searchResultListRef.current;
    if (!searchResultList) return;

    const handleScroll = () => {
      if (
        searchResultList.scrollTop ===
        searchResultList.scrollHeight - searchResultList.offsetHeight
      ) {
        fetchDocuments(previousSearchQuery, true);
      }
    };

    searchResultList.addEventListener("scroll", handleScroll);

    return () => {
      searchResultList?.removeEventListener("scroll", handleScroll);
    };
  }, [foundDocuments, previousSearchQuery, fetchDocuments]);

  useEffect(() => {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      if (debouncedQuery.length) {
        await fetchDocuments(debouncedQuery);
      }
    }, 250);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [debouncedQuery, fetchDocuments]);

  return (
    <>
      <SearchBar
        defaultValue={previousSearchQuery}
        onChange={(e) => setDebouncedQuery(e.target.value)}
      />
      <Separator />

      <div className="text-accent-foreground/60 flex justify-between py-1 pl-4 pr-3 text-sm font-medium">
        <div className="py-0.5">{resultMessage}</div>

        <SearchFilters>
          <Button variant="control-ghost" size="control-icon" className="h-6">
            <Icons.arrowUpDown size={16} />
          </Button>
        </SearchFilters>
      </div>

      <SearchResult
        ref={searchResultListRef}
        result={previousSearchResults ? previousSearchResults : foundDocuments || []}
        isPending={isPending}
      />
    </>
  );
};

export const SearchMenu = () => (
  <HotkeysProvider initiallyActiveScopes={["search-menu"]}>
    <SearchDialog />
  </HotkeysProvider>
);
