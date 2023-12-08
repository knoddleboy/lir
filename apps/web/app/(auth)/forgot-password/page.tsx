import { Button } from "@lir/ui";

import { type Metadata } from "next";
import Link from "next/link";

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
          <Button variant="link" size="link-ghost" text="base">
            <Link href="/login">Or go back to log in</Link>
          </Button>
        </div>
      </div>
      <FotgotPasswordForm />
    </div>
  );
}
