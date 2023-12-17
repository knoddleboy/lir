import {
  Button,
  Icons,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@lir/ui";

import { DeleteUserForm } from "./ui/delete-user-form";
import { Setting } from "./ui/setting";
import { SettingDialog } from "./ui/setting-dialog";

export const DeleteAccount = () => {
  return (
    <SettingDialog
      trigger={
        <Button variant="control-ghost" className="h-fit w-full px-2 py-1">
          <Setting
            label={<span className="text-destructive">Delete account</span>}
            description="Permanently delete this account and all related data."
            actionSuffix={
              <div className="text-accent-foreground/60 absolute -right-2.5 h-7 w-7 p-1">
                <Icons.chevronRight className="w-full" />
              </div>
            }
          />
        </Button>
      }
    >
      <DialogHeader>
        <DialogTitle>Delete your account?</DialogTitle>
        <DialogDescription>
          This action is irreversible. All your data will be permanently deleted.
        </DialogDescription>
      </DialogHeader>

      <DeleteUserForm />
    </SettingDialog>
  );
};
