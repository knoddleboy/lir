import { ErrorResponseCode } from "@lir/lib/error";
import {
  Button,
  Icons,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  PasswordField,
} from "@lir/ui";

import { AxiosError } from "axios";
import { type FormEvent } from "react";
import { toast } from "sonner";

import { useDeleteUser } from "./api";
import { Setting } from "./ui/setting";
import { SettingDialog } from "./ui/setting-dialog";

export const DeleteAccount = ({ onDelete }: { onDelete: () => void }) => {
  const { mutateAsync: deleteAccount } = useDeleteUser();

  const errorMessages: { [key: string]: string } = {
    [ErrorResponseCode.InvalidCredentials]: "Invalid password",
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await Promise.all([
        deleteAccount({
          password: ((e.target as HTMLFormElement)[0] as HTMLInputElement).value,
        }),
        onDelete(),
      ]);

      toast.success("Account successfully deleted. See you!");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(errorMessages[error.response?.data.message]);
      }
    }
  };

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

      <div className="space-y-2">
        <p className="text-[15px]">Please enter your password to confirm.</p>
        <form className="flex items-center space-x-4" onSubmit={onSubmit}>
          <PasswordField name="password" />
          <Button
            variant="control-destructive"
            className="h-[30px] font-medium"
            size="link"
            type="submit"
          >
            Delete my account
          </Button>
        </form>
      </div>
    </SettingDialog>
  );
};
