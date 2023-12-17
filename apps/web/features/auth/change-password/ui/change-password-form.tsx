"use client";

import { ErrorResponseCode } from "@lir/lib/error";
import { type ChangePasswordInput, changePasswordSchema } from "@lir/lib/schema";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormHints,
  FormItem,
  FormLabel,
  FormMessage,
  PasswordField,
} from "@lir/ui";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useChangePassword } from "../api";

export const ChangePasswordForm = () => {
  const { mutateAsync: changePassword, isPending } = useChangePassword();

  const form = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
    mode: "onChange",
  });

  const errorMessages: { [key: string]: string } = {
    [ErrorResponseCode.IncorrectPassword]: "Please enter a valid old password.",
    [ErrorResponseCode.NewPasswordMatchesOldPassword]:
      "New password cannot be the same as your current password.",
  };

  const onSubmit = async (data: ChangePasswordInput) => {
    try {
      await changePassword(data);

      form.reset();
      toast.success("Password has been changed successfully.");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(errorMessages[error.response?.data.message]);
      }
    }
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Old password</FormLabel>
                <FormControl>
                  <PasswordField placeholder="Enter old password" {...field} />
                </FormControl>
                <FormMessage className="text-[13px]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <PasswordField placeholder="Enter new password" {...field} />
                </FormControl>
                <FormHints
                  className="text-[13px]"
                  fieldName="newPassword"
                  hints={["min", "num", "upplow"]}
                />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={isPending}
          variant="control"
          size="link"
          className="font-medium"
        >
          Change password
        </Button>
      </form>
    </Form>
  );
};
