import { Button } from "@lir/ui";

import type { Metadata } from "next";
import Link from "next/link";

import { LoginForm } from "~/features/auth/login";

export const metadata: Metadata = {
  title: "Log In",
};

export default function LoginPage() {
  return (
    <>
      <div className="space-y-3">
        <h2 className="text-center text-4xl font-bold">Welcome back</h2>

        <div className="text-center">
          <Button variant="link" size="link-ghost" text="base" asChild>
            <Link href="/signup">Don&apos;t have an account?</Link>
          </Button>
        </div>
      </div>

      <LoginForm />
    </>
  );
}
