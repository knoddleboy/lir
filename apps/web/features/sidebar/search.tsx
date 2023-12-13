import { Button, Dialog, DialogContent, Icons, Input, Separator } from "@lir/ui";

import { useHotkeys } from "react-hotkeys-hook";

import { useSearchStore } from "./store/store";
import { SearchSort } from "./ui/search-sort";

export const Search = () => {
  const { open, setOpen } = useSearchStore();

  useHotkeys(
    "meta+p",
    (e) => {
      e.preventDefault();
      setOpen(!open);
    },
    { enableOnFormTags: ["input"] }
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        withCloseButton={false}
        className="data-[state=closed]:slide-out-to-top-[0px] data-[state=open]:slide-in-from-top-[0px] top-[100px] flex h-auto max-h-[max(50vh,384px)] max-w-xl translate-y-0 flex-col gap-0 overflow-hidden !rounded-xl p-0"
      >
        <div className="flex px-2">
          <div className="flex h-11 w-8 items-center justify-center">
            <Icons.search className="text-accent-foreground/60 w-[15px]" />
          </div>
          <Input
            type="text"
            placeholder="Search"
            className="placeholder:text-accent-foreground/40 h-11 rounded-none border-none bg-transparent px-0 text-lg font-medium focus-visible:ring-0"
          />
        </div>
        <Separator />
        <div className="text-accent-foreground/60 flex justify-between py-1 pl-4 pr-3 text-sm font-medium">
          <div className="py-0.5">1 result</div>
          <SearchSort>
            <Button variant="control-ghost" size="control-icon" className="h-6">
              <Icons.arrowUpDown size={16} />
            </Button>
          </SearchSort>
        </div>
        <div className="h-full max-h-fit overflow-y-auto px-2 pb-2">
          <div className="hover:bg-control active:text-accent-foreground active:bg-control-foreground text-accent-foreground/75 flex cursor-pointer select-none items-center rounded-md bg-transparent px-2 py-2 font-medium">
            <div className="mr-2 flex h-4 w-4 shrink-0 grow-0 items-center justify-center">
              <Icons.document />
            </div>

            <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm">
              King Lir
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
