import { cn } from "@lir/lib";
import type { DocumentProps } from "@lir/lib/schema";
import { Icons, Spinner } from "@lir/ui";

import { memo, useState, useCallback, forwardRef, type ElementRef } from "react";

import Link from "next/link";

import { searchModel } from "~/entities/search";
import { generateDocumentURL } from "~/shared";

type SearchResultItemProps = {
  item: DocumentProps;
  isActive: boolean;
  onHover: () => void;
  onClick: () => void;
};

const SearchResultItem = memo(
  ({ item, isActive, onHover, onClick }: SearchResultItemProps) => {
    return (
      <Link
        role="menuitem"
        href={generateDocumentURL(item.title, item.id)}
        tabIndex={-1}
        onMouseEnter={onHover}
        onClick={onClick}
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
          {item.title}
        </div>
      </Link>
    );
  }
);
SearchResultItem.displayName = "SearchResultItem";

type SearchResultProps = {
  result: DocumentProps[];
  isPending: boolean;
};

const MAX_DOCS_IN_VIEW = 10;
const HALF_DOCS = Math.floor(MAX_DOCS_IN_VIEW / 2 - 1);
const DOC_HEIGHT = 36;
const SPINNER_SIZE = 16;

export const SearchResult = forwardRef<ElementRef<"div">, SearchResultProps>(
  ({ result, isPending }, ref) => {
    const setSearchMenuOpen = searchModel.useSearchStore(
      (state) => state.setSearchMenuOpen
    );

    const [cursor, setCursor] = useState<number>(0);

    const onHover = useCallback(
      (index: number) => {
        setCursor(index);
      },
      [setCursor]
    );

    return (
      <div
        ref={ref}
        role="menu"
        className="relative h-full max-h-fit w-full scroll-pb-2 overflow-y-auto px-2 pb-2"
      >
        {isPending && (
          <div
            className="fixed left-1/2 z-10 -translate-x-1/2"
            style={{
              top:
                (result.length > MAX_DOCS_IN_VIEW
                  ? HALF_DOCS
                  : Math.floor(result.length / 2)) *
                  DOC_HEIGHT +
                (DOC_HEIGHT - SPINNER_SIZE) / 2 +
                77 +
                "px",
            }}
          >
            <Spinner />
          </div>
        )}

        <div className={cn(isPending && "opacity-60")}>
          {result.map((document, i) => (
            <SearchResultItem
              key={document.id}
              item={document}
              isActive={cursor === i}
              onHover={() => onHover(i)}
              onClick={() => setSearchMenuOpen(false)}
            />
          ))}
        </div>
      </div>
    );
  }
);
SearchResult.displayName = "SearchResult";
