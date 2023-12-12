import { Dialog, DialogContent, DialogTrigger } from "@lir/ui";

type Props = {
  className?: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
};

export const SettingDialog = ({ className, trigger, children }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={className}>{children}</DialogContent>
    </Dialog>
  );
};
