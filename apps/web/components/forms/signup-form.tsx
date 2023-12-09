"use client";

import { signupUserSchema } from "@lir/lib/schema";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormHints,
  Input,
  PasswordField,
  EmailField,
} from "@lir/ui";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const SignupForm = () => {
  const form = useForm({
    resolver: zodResolver(signupUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = () => {};

  return (
    <Form {...form}>
      <form className="space-y-9" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                <FormHints fieldName="password" hints={["min", "num", "upplow"]} />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full" type="submit">
          Sign up
        </Button>
      </form>
    </Form>
  );
};
