"use client";

import { ErrorResponseCode } from "@lir/lib/error";
import { type SingupUserInput, signupUserSchema } from "@lir/lib/schema";
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
  Alert,
  Icons,
  AlertDescription,
} from "@lir/ui";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { useSignup } from "../api/signup";

export const SignupForm = () => {
  const router = useRouter();

  const { mutateAsync: signup, isPending, isSuccess } = useSignup();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<SingupUserInput>({
    resolver: zodResolver(signupUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const errorMessages: { [key: string]: string } = {
    [ErrorResponseCode.UserAlreadyExists]: "User with this email already exists.",
    [ErrorResponseCode.InternalServerError]:
      "Something went wrong. Please try again",
  };

  const onSubmit = async (data: SingupUserInput) => {
    try {
      setErrorMessage(null);
      const res = await signup(data);

      if (!res)
        setErrorMessage(errorMessages[ErrorResponseCode.InternalServerError]);

      router.push("/signup/verify-email");
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Name</FormLabel>
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
                <FormHints fieldName="password" hints={["min", "num", "upplow"]} />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full" type="submit" disabled={isPending || isSuccess}>
          Sign up
        </Button>
      </form>
    </Form>
  );
};
