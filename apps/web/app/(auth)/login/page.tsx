import { Link } from "@lir/ui";

import { type Metadata } from "next";
import NextLink from "next/link";

import { LoginForm } from "~/components/forms/login-form";

export const metadata: Metadata = {
  title: "Log In",
};

export default function LoginPage() {
  return (
    <div className="mb-24 w-full max-w-[360px] space-y-8">
      <div className="space-y-3">
        <h2 className="text-center text-4xl font-bold">Welcome back</h2>
        <div className="text-center">
          <Link asChild>
            <NextLink href="/signup">Don&apos;t have an account?</NextLink>
          </Link>
        </div>
      </div>
      <LoginForm />
    </div>
  );
}
