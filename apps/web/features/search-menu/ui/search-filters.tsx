import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@lir/ui";

import { useState } from "react";

type Props = {
  children: React.ReactNode;
};

export const SortBy = {
  Manually: "Manually",
  Title: "By title",
  DateModified: "Date modified",
  DateCreated: "Date created",
} as const;

export const SortDirection = {
  AtoZ: "A to Z",
  ZtoA: "Z to A",
  OldestFirst: "Oldest first",
  NewestFirst: "Newest first",
} as const;

export const SearchFilters = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>(SortBy.Manually);
  const [sortDirection, setSortDirection] = useState<{
    title: string;
    date: string;
  }>({
    title: SortDirection.AtoZ,
    date: SortDirection.NewestFirst,
  });

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        onClick={() => setOpen(!open)}
        onPointerDown={(e) => e.preventDefault()}
      >
        {children}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="font-medium">
        <DropdownMenuRadioGroup
          value={sortBy}
          onValueChange={setSortBy}
          className="[&>*]:py-0.5 [&>*]:pl-1.5 [&>*]:pr-2"
        >
          <DropdownMenuRadioItem
            value={SortBy.Manually}
            onSelect={(e) => e.preventDefault()}
          >
            {SortBy.Manually}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value={SortBy.Title}
            onSelect={(e) => e.preventDefault()}
          >
            {SortBy.Title}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value={SortBy.DateModified}
            onSelect={(e) => e.preventDefault()}
          >
            {SortBy.DateModified}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value={SortBy.DateCreated}
            onSelect={(e) => e.preventDefault()}
          >
            {SortBy.DateCreated}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        {sortBy !== SortBy.Manually && <DropdownMenuSeparator />}

        {sortBy === SortBy.Title && (
          <DropdownMenuRadioGroup
            value={sortDirection.title}
            onValueChange={(title) =>
              setSortDirection((prev) => ({ ...prev, title }))
            }
            className="[&>*]:py-0.5 [&>*]:pl-1.5 [&>*]:pr-2"
          >
            <DropdownMenuRadioItem value={SortDirection.AtoZ}>
              {SortDirection.AtoZ}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={SortDirection.ZtoA}>
              {SortDirection.ZtoA}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        )}

        {(sortBy === SortBy.DateModified || sortBy === SortBy.DateCreated) && (
          <DropdownMenuRadioGroup
            value={sortDirection.date}
            onValueChange={(date) => setSortDirection((prev) => ({ ...prev, date }))}
            className="[&>*]:py-0.5 [&>*]:pl-1.5 [&>*]:pr-2"
          >
            <DropdownMenuRadioItem value={SortDirection.NewestFirst}>
              {SortDirection.NewestFirst}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={SortDirection.OldestFirst}>
              {SortDirection.OldestFirst}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
