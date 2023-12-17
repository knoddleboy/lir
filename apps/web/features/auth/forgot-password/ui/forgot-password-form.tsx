"use client";

import { type ForgotPasswordInput, forgotPasswordSchema } from "@lir/lib/schema";
import {
  Button,
  EmailField,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icons,
} from "@lir/ui";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Link from "next/link";

import { useForgotPassword } from "../api";

export const FotgotPasswordForm = () => {
  const {
    mutateAsync: sendVerification,
    isPending,
    isSuccess,
  } = useForgotPassword();

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    await sendVerification(data);
  };

  const Success = () => (
    <>
      <div className="space-y-3">
        <h2 className="text-center text-2xl font-bold">Reset email sent</h2>
      </div>
      <div>
        <hr />
        <div className="my-8">
          <h2 className="text-center text-3xl font-bold">Check your email</h2>
          <div className="mt-6 text-center">
            We&apos;ve just sent a link to
            <div className="text-lg font-medium">{form.getValues().email}</div>
            <div className="my-6">
              Follow the link in your email to reset your password. If you
              haven&apos;t received it within a few minutes, double check your email
              address and spam/junk folder.
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            className="mt-2 font-medium text-orange-600 dark:font-normal"
            variant="link"
            size="link-ghost"
            text="sm"
            asChild
          >
            <Link href="/login">
              <Icons.arrowLeft size={14} className="mr-1" />
              Back to log in
            </Link>
          </Button>
        </div>
      </div>
    </>
  );

  return isSuccess ? (
    <Success />
  ) : (
    <>
      <div className="space-y-3">
        <h2 className="text-center text-4xl font-bold">Reset your password</h2>

        <div className="text-center">
          <Button variant="link" size="link-ghost" text="base">
            <Link href="/login">Or go back to log in</Link>
          </Button>
        </div>
      </div>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Email</FormLabel>
                  <FormControl>
                    <EmailField {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full" type="submit" disabled={isPending}>
            Send reset email
          </Button>
        </form>
      </Form>
    </>
  );
};
