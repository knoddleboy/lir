"use client";

import { resetPasswordSchema } from "@lir/lib/schema";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormHints,
  FormItem,
  FormLabel,
  Input,
} from "@lir/ui";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type ResetPasswordFormProps = {
  requestId: string;
};

export const ResetPasswordForm = ({ requestId }: ResetPasswordFormProps) => {
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      requestId,
    },
    mode: "onChange",
  });
  const value = form.watch("newPassword");
  const submitting = form.formState.isSubmitting;
  const isEmpty = value?.length === 0;

  const onSubmit = () => {};

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter new password" {...field} />
                </FormControl>
                <FormHints
                  fieldName="newPassword"
                  hints={["min", "num", "upplow"]}
                />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isEmpty || submitting} type="submit" className="w-full">
          Reset password
        </Button>
      </form>
    </Form>
  );
};
