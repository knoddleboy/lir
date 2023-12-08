import { Link } from "@lir/ui";

import { type Metadata } from "next";
import NextLink from "next/link";

import { SignupForm } from "~/components/forms/signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function LoginPage() {
  return (
    <div className="mb-24 w-full max-w-[360px] space-y-8">
      <div className="space-y-3">
        <h2 className="text-center text-4xl font-bold">Create account</h2>
        <div className="text-center">
          <Link asChild>
            <NextLink href="/login">Already have an account?</NextLink>
          </Link>
        </div>
      </div>
      <SignupForm />
    </div>
  );
}
