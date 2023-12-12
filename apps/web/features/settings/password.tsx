import { Button, DialogDescription, DialogHeader, DialogTitle } from "@lir/ui";

import { ChangePasswordForm } from "../auth/change-password/change-password-form";
import { Setting } from "./ui/setting";
import { SettingDialog } from "./ui/setting-dialog";

export const PasswordSetting = () => (
  <Setting
    label="Password"
    description="Remember to keep your password safe."
    actionSuffix={
      <SettingDialog
        className="max-w-sm"
        trigger={
          <Button
            variant="control-ghost"
            size="link"
            className="text-xs font-medium"
          >
            &lowast;&lowast;&lowast;&lowast;&lowast;&lowast;&lowast;&lowast;
          </Button>
        }
      >
        <DialogHeader>
          <DialogTitle>Change your password</DialogTitle>
          <DialogDescription>
            {/* The password should be at least 8 characters long, containing at least
            one number and have both uppercase and lowercase letters. */}
            Your new password must follow the required security guidelines provided
            below.
          </DialogDescription>
        </DialogHeader>
        <ChangePasswordForm />
      </SettingDialog>
    }
  />
);
