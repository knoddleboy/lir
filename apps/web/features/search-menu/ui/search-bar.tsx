import { Icons, Input } from "@lir/ui";

type Props = {
  defaultValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchBar = ({ defaultValue, onChange }: Props) => {
  return (
    <div className="flex px-2">
      <div className="flex h-11 w-8 items-center justify-center">
        <Icons.search className="text-accent-foreground/60 w-[15px]" />
      </div>
      <Input
        type="text"
        name="search"
        placeholder="Search"
        defaultValue={defaultValue}
        onChange={onChange}
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        className="placeholder:text-accent-foreground/40 h-11 rounded-none border-none bg-transparent px-0 text-lg font-medium focus-visible:ring-0"
      />
    </div>
  );
};
