import {
  Button,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Skeleton,
} from "@lir/ui";

import { ChangeEmailForm } from "./ui/change-email-form";
import { Setting } from "./ui/setting";
import { SettingDialog } from "./ui/setting-dialog";

type Props = {
  email: string | undefined;
};

export const EmailSetting = ({ email }: Props) => {
  return (
    <Setting
      label="Email"
      description="You can have only one account per email."
      actionSuffix={
        email ? (
          <SettingDialog
            trigger={
              <Button
                variant="control-ghost"
                size="link"
                className="text-sm font-medium"
              >
                {email}
              </Button>
            }
          >
            <DialogHeader>
              <DialogTitle>Change your email</DialogTitle>
              <DialogDescription>
                You may be logged out for changes to take effect. We&apos;ll send you
                a verification link to this email, which you can use to log back in.
              </DialogDescription>
            </DialogHeader>

            <ChangeEmailForm currentEmail={email} />
          </SettingDialog>
        ) : (
          <Skeleton className="h-6 w-[15ch]" />
        )
      }
    />
  );
};
