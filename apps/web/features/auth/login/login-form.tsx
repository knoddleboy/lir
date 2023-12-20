"use client";

import { ErrorResponseCode } from "@lir/lib/error";
import { type LoginUserInput, loginUserSchema } from "@lir/lib/schema";
import {
  Alert,
  AlertDescription,
  Button,
  EmailField,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icons,
  PasswordField,
} from "@lir/ui";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useLogin } from "~/features/auth";

export const LoginForm = () => {
  const router = useRouter();

  const { mutateAsync: login, isPending, isSuccess } = useLogin();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const errorMessages: { [key: string]: string } = {
    [ErrorResponseCode.InvalidCredentials]: "Invalid email or password",
    [ErrorResponseCode.InternalServerError]:
      "Something went wrong. Please try again",
  };

  const onSubmit = async (data: LoginUserInput) => {
    try {
      setErrorMessage(null);
      const res = await login(data);

      if (!res)
        setErrorMessage(errorMessages[ErrorResponseCode.InternalServerError]);

      router.push("/d");
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(errorMessages[error.response?.data.message]);
      } else {
        setErrorMessage(errorMessages[ErrorResponseCode.InternalServerError]);
      }
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="space-y-4">
          {errorMessage && (
            <Alert variant="destructive">
              <Icons.xCircle size={18} />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="text-sm">Password</FormLabel>
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
        <Button className="w-full" type="submit" disabled={isPending || isSuccess}>
          Log in
        </Button>
      </form>
    </Form>
  );
};
