import type { SearchInput } from "@lir/lib/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@lir/ui";

import { Fragment, useState } from "react";

import { searchModel } from "~/entities/search";

const sortByMapping: [SearchInput["sort"]["sortBy"], string][] = [
  ["fixed", "Fixed"],
  ["byTitle", "By title"],
  ["dateModified", "Date modified"],
  ["dateCreated", "Date created"],
];

const sortDirectionMapping: Record<
  "byTitle" | "byDate",
  [NonNullable<SearchInput["sort"]["sortDirection"]>, string][]
> = {
  byTitle: [
    ["asc", "A to Z"],
    ["desc", "Z to A"],
  ],
  byDate: [
    ["asc", "Oldest first"],
    ["desc", "Newest first"],
  ],
};

export const SearchFilters = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  const sortBy = searchModel.useSearchStore((state) => state.sortBy);
  const sortDirection = searchModel.useSearchStore((state) => state.sortDirection);
  const setSort = searchModel.useSearchStore((state) => state.setSort);

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
          onValueChange={(value) => {
            setSort({ sortBy: value as SearchInput["sort"]["sortBy"] });
          }}
          className="[&>*]:py-0.5 [&>*]:pl-1.5 [&>*]:pr-2"
        >
          {sortByMapping.map(([key, mapping]) => (
            <Fragment key={key}>
              <DropdownMenuRadioItem
                value={key}
                onSelect={(e) => e.preventDefault()}
              >
                {mapping}
              </DropdownMenuRadioItem>

              {key === "fixed" && (
                <DropdownMenuSeparator
                  // Overriding the group's paddings with
                  // !important appears to be the only way here.
                  className="!p-0"
                />
              )}
            </Fragment>
          ))}
        </DropdownMenuRadioGroup>

        {sortBy !== "fixed" && <DropdownMenuSeparator />}

        {sortBy !== "fixed" && (
          <DropdownMenuRadioGroup
            value={sortDirection}
            onValueChange={(value) =>
              setSort({
                sortDirection: value as SearchInput["sort"]["sortDirection"],
              })
            }
            className="[&>*]:py-0.5 [&>*]:pl-1.5 [&>*]:pr-2"
          >
            {sortDirectionMapping[sortBy === "byTitle" ? "byTitle" : "byDate"].map(
              ([key, mapping]) => (
                <DropdownMenuRadioItem key={key} value={key}>
                  {mapping}
                </DropdownMenuRadioItem>
              )
            )}
          </DropdownMenuRadioGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
