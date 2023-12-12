"use client";

import { changePasswordSchema } from "@lir/lib/schema";
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
import { useForm } from "react-hook-form";

export const ChangePasswordForm = () => {
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = () => {};

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
        <Button variant="control" type="submit" className="font-medium" size="link">
          Change password
        </Button>
      </form>
    </Form>
  );
};
