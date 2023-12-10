"use client";

import { forgotPasswordSchema } from "@lir/lib/schema";
import {
  Button,
  EmailField,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@lir/ui";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const FotgotPasswordForm = () => {
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = () => {};

  return (
    <Form {...form}>
      <form className="space-y-9" onSubmit={form.handleSubmit(onSubmit)}>
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
        </div>
        <Button className="w-full" type="submit">
          Send reset email
        </Button>
      </form>
    </Form>
  );
};
