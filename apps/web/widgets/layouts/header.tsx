type Props = {
  children?: React.ReactNode;
};

export const Header = ({ children }: Props) => (
  <header className="bg-muted h-[52px] max-w-[100vw]">
    <div className="flex h-full items-center justify-between px-2">{children}</div>
  </header>
);
