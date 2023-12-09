"use client";

import { loginUserSchema } from "@lir/lib/schema";
import {
  Button,
  EmailField,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  PasswordField,
} from "@lir/ui";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Link from "next/link";

export const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {};

  return (
    <Form {...form}>
      <form className="space-y-9" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <EmailField {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordField {...field} />
                </FormControl>
                <FormMessage />
                <div className="absolute -top-1 right-0">
                  <Link tabIndex={-1} className="text-sm" href="/forgot-password">
                    Forgot?
                  </Link>
                </div>
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full" type="submit">
          Log in
        </Button>
      </form>
    </Form>
  );
};
