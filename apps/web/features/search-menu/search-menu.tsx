import { cn } from "@lir/lib";
import { Button, Dialog, DialogContent, Icons, Separator } from "@lir/ui";

import { memo, useCallback, useState } from "react";
import { HotkeysProvider, useHotkeys } from "react-hotkeys-hook";

import { useSearchStore } from "~/entities/search/model/store";

import { SearchBar } from "./ui/search-bar";
import { SearchFilters } from "./ui/search-filters";

type SearchResultItemProps = {
  item: React.ReactNode;
  isActive: boolean;
  onHover: () => void;
};

// const MAX_ITEMS_BEFORE_OVERFLOW = 10;

const SearchResultItem = memo(
  ({ item, isActive, onHover }: SearchResultItemProps) => {
    return (
      <div
        role="menuitem"
        tabIndex={-1}
        onMouseEnter={onHover}
        className={cn(
          `text-accent-foreground/75 flex cursor-pointer select-none items-center
         rounded-md bg-transparent px-2 py-2 font-medium outline-none`,
          isActive &&
            "bg-control hover:bg-control active:text-accent-foreground active:bg-control-foreground"
        )}
      >
        <div className="mr-2 flex h-4 w-4 shrink-0 grow-0 items-center justify-center">
          <Icons.document />
        </div>

        <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm">
          {item}
        </div>
      </div>
    );
  }
);
SearchResultItem.displayName = "SearchResultItem";

const SearchResult = () => {
  const [cursor, setCursor] = useState<number>(0);
  // const activeItemRef = useRef<HTMLDivElement | null>(null);

  // just testing
  const searchResultLength = 20;

  const onHover = useCallback(
    (index: number) => {
      setCursor(index);
    },
    [setCursor]
  );

  return (
    <div
      role="menu"
      className="h-full max-h-fit scroll-pb-2 overflow-y-auto px-2 pb-2"
    >
      {Array(searchResultLength)
        .fill(0)
        .map((_, i) => (
          <SearchResultItem
            key={i} // just for now
            item={i}
            isActive={cursor === i}
            onHover={() => onHover(i)}
            // ref={(ref) => {
            //   if (cursor === i) {
            //     activeItemRef.current = ref;
            //   }
            // }}
          />
        ))}
    </div>
  );
};

const SearchDialog = () => {
  const { open, setOpen } = useSearchStore();

  useHotkeys(
    "mod+p",
    () => setOpen(!open),
    {
      preventDefault: true,
      enableOnFormTags: ["input"],
    },
    [open]
  );

  // useHotkeys(
  //   "ArrowUp, ArrowDown",
  //   (e) => {
  //     setCursor((prev) => {
  //       const offset = prev + (e.key === "ArrowUp" ? -1 : +1);
  //       return (offset + searchResultLength) % searchResultLength;
  //     });
  //     setHotKeyNavigated(true);
  //   },
  //   {
  //     preventDefault: true,
  //     scopes: ["search-menu"],
  //     enableOnFormTags: ["input"],
  //     enabled: open,
  //   },
  //   []
  // );

  // useEffect(() => {
  //   if (
  //     searchResultLength < MAX_ITEMS_BEFORE_OVERFLOW ||
  //     !activeItemRef.current ||
  //     !hotKeyNavigated
  //   )
  //     return;

  //   activeItemRef.current.scrollIntoView({
  //     block: "nearest",
  //     behavior: "instant",
  //   });
  // }, [cursor, hotKeyNavigated]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        withCloseButton={false}
        animateSlideY={false}
        className="top-[min(15%,100px)] flex h-auto max-h-[max(50vh,384px)] max-w-xl translate-y-[0%] flex-col gap-0 overflow-hidden !rounded-xl p-0 outline-none"
      >
        <SearchBar />
        <Separator />

        <div className="text-accent-foreground/60 flex justify-between py-1 pl-4 pr-3 text-sm font-medium">
          <div className="py-0.5">1 result</div>

          <SearchFilters>
            <Button variant="control-ghost" size="control-icon" className="h-6">
              <Icons.arrowUpDown size={16} />
            </Button>
          </SearchFilters>
        </div>

        <SearchResult />
      </DialogContent>
    </Dialog>
  );
};

export const SearchMenu = () => (
  <HotkeysProvider initiallyActiveScopes={["search-menu"]}>
    <SearchDialog />
  </HotkeysProvider>
);
