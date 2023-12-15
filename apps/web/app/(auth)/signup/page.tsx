import { Button } from "@lir/ui";

import type { Metadata } from "next";
import Link from "next/link";

import { SignupForm } from "~/features/auth/signup";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignupPage() {
  return (
    <>
      <div className="space-y-3">
        <h2 className="text-center text-4xl font-bold">Create account</h2>

        <div className="text-center">
          <Button variant="link" size="link-ghost" text="base" asChild>
            <Link href="/login">Already have an account?</Link>
          </Button>
        </div>
      </div>

      <SignupForm />
    </>
  );
}
