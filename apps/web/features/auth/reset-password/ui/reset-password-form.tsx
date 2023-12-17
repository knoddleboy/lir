"use client";

import { ErrorResponseCode } from "@lir/lib/error";
import { type ResetPasswordInput, resetPasswordSchema } from "@lir/lib/schema";
import {
  Alert,
  AlertDescription,
  Button,
  Form,
  FormControl,
  FormField,
  FormHints,
  FormItem,
  FormLabel,
  Icons,
  PasswordField,
} from "@lir/ui";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

import { useResetPassword } from "../api";

export const ResetPasswordForm = ({ requestId }: { requestId: string }) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutateAsync: resetPassword, isPending } = useResetPassword();

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      requestId,
    },
    mode: "onChange",
  });
  const value = form.watch("newPassword");
  const isEmpty = value?.length === 0;

  const errorMessages: { [key: string]: string } = {
    [ErrorResponseCode.InvalidOrExpiredPasswordResetRequest]:
      "The request is expired",
    [ErrorResponseCode.NewPasswordMatchesOldPassword]:
      "New password cannot be the same as your current password.",
    [ErrorResponseCode.InternalServerError]:
      "Something went wrong. Please try again",
  };

  const onSubmit = async (data: ResetPasswordInput) => {
    try {
      await resetPassword(data);

      toast.success(
        "Password has been changed successfully. Now use you can use your new password to login."
      );

      router.push("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(errorMessages[error.response?.data.message]);
      } else {
        setErrorMessage(errorMessages[ErrorResponseCode.InternalServerError]);
      }
    }
  };

  return (
    <>
      {errorMessage && (
        <Alert variant="destructive">
          <Icons.xCircle size={18} />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">New password</FormLabel>
                  <FormControl>
                    <PasswordField placeholder="Enter new password" {...field} />
                  </FormControl>
                  <FormHints
                    fieldName="newPassword"
                    hints={["min", "num", "upplow"]}
                  />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isEmpty || isPending} type="submit" className="w-full">
            Reset password
          </Button>
        </form>
      </Form>
    </>
  );
};
