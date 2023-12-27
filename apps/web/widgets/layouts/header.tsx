type Props = {
  children?: React.ReactNode;
};

export const Header = ({ children }: Props) => (
  <header className="bg-muted absolute left-0 top-0 h-[52px] w-full max-w-[100vw]">
    <div className="flex h-full items-center justify-between gap-2 px-2">
      {children}
    </div>
  </header>
);
