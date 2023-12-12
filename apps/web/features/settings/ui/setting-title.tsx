import { Separator } from "@lir/ui";

type SettingTitleProps = {
  className?: string;
  children?: React.ReactNode;
};

export const SettingTitle = ({ className, children }: SettingTitleProps) => (
  <div className={className}>
    <h1 className="text-lg font-medium">{children}</h1>
    <Separator className="mt-4" />
  </div>
);
