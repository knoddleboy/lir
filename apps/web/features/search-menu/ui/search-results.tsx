import { cn } from "@lir/lib";
import type { DocumentProps } from "@lir/lib/schema";
import { Icons } from "@lir/ui";

import { memo, useState, useCallback } from "react";

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
};

export const SearchResult = ({ result }: SearchResultProps) => {
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
      role="menu"
      className="h-full max-h-fit scroll-pb-2 overflow-y-auto px-2 pb-2"
    >
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
  );
};
