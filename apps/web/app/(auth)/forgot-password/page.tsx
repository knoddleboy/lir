import { Link } from "@lir/ui";

import { type Metadata } from "next";
import NextLink from "next/link";

import { FotgotPasswordForm } from "~/components/forms/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password?",
};

export default function ForgotPasswordPage() {
  return (
    <div className="mb-24 w-full max-w-[360px] space-y-8">
      <div className="space-y-3">
        <h2 className="text-center text-4xl font-bold">Reset your password</h2>
        <div className="text-center">
          <Link asChild>
            <NextLink href="/login">Or go back to log in</NextLink>
          </Link>
        </div>
      </div>
      <FotgotPasswordForm />
    </div>
  );
}
