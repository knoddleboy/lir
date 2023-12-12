import {
  Button,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  EmailField,
} from "@lir/ui";

import { Setting } from "./ui/setting";
import { SettingDialog } from "./ui/setting-dialog";

export const EmailSetting = () => (
  <Setting
    label="Email"
    description="You can have only one account per email."
    actionSuffix={
      <SettingDialog
        trigger={
          <Button
            variant="control-ghost"
            size="link"
            className="text-sm font-medium"
          >
            test@test.com
          </Button>
        }
      >
        <DialogHeader>
          <DialogTitle>Change your email</DialogTitle>
          <DialogDescription>
            You may be logged out for changes to take effect. We&apos;ll send you a
            verification link to this email, which you can use to log back in.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-4">
          <EmailField placeholder="" defaultValue="text@text.com" />
          <Button variant="control" className="h-[30px] font-medium" size="link">
            Send verification link
          </Button>
        </div>
      </SettingDialog>
    }
  />
);
