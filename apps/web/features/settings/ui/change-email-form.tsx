"use client";

import { type UpdateUserInput, updateUserSchema } from "@lir/lib/schema";
import { Button, EmailField, Form, FormControl, FormField, FormItem } from "@lir/ui";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

import { useLogout } from "~/features/auth";

import { useUpdateUser } from "../api";

type Props = {
  currentEmail: string;
};

export const ChangeEmailForm = ({ currentEmail }: Props) => {
  const router = useRouter();

  const { mutateAsync: updateEmail, isPending } = useUpdateUser();
  const { mutateAsync: logout } = useLogout();

  const form = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      email: currentEmail,
    },
    mode: "onSubmit",
  });
  const isDirty = form.formState.isDirty;
  const isSubmitted = form.formState.isSubmitted;
  const errors = form.formState.errors;

  const onSubmit = async (data: UpdateUserInput) => {
    try {
      await updateEmail(data);

      toast.success(
        "Email has been changed successfully. We've sent you an email with a link to verify your new email."
      );

      await logout();
      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const emailErrors = errors.email?.message;

    if (isSubmitted && emailErrors) {
      toast.error(emailErrors);
    }
  }, [isSubmitted, errors]);

  return (
    <Form {...form}>
      <form
        className="flex items-center space-x-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <div className="flex-1">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <EmailField {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={!isDirty || isPending}
          variant="control"
          size="link"
          className="h-[30px] font-medium"
        >
          Send verification link
        </Button>
      </form>
    </Form>
  );
};
