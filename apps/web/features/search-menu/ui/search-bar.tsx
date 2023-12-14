import { Icons, Input } from "@lir/ui";

type Props = {
  onChange?: () => void;
};

export const SearchBar = ({ onChange }: Props) => {
  return (
    <div className="flex px-2">
      <div className="flex h-11 w-8 items-center justify-center">
        <Icons.search className="text-accent-foreground/60 w-[15px]" />
      </div>
      <Input
        type="text"
        placeholder="Search"
        spellCheck={false}
        onChange={onChange}
        className="placeholder:text-accent-foreground/40 h-11 rounded-none border-none bg-transparent px-0 text-lg font-medium focus-visible:ring-0"
      />
    </div>
  );
};
