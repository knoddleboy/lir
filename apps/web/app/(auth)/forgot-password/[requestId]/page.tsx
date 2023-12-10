import { cn } from "@lir/lib";
import { Button, Icons } from "@lir/ui";

import type { Metadata } from "next";
import Link from "next/link";

import { ResetPasswordForm } from "~/features/reset-password/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
};

type Props = {
  params: {
    requestId: string;
  };
};

export default function ResetPasswordPage({ params: { requestId } }: Props) {
  const requestValid = false;

  return (
    <>
      <div className="space-y-3">
        <h2
          className={cn(
            "text-center font-bold",
            requestValid ? "text-4xl" : "text-2xl"
          )}
        >
          Reset your password
        </h2>
      </div>
      {requestValid ? (
        <ResetPasswordForm requestId={requestId} />
      ) : (
        <div>
          <hr />
          <div className="my-8">
            <h2 className="text-center text-3xl font-bold">Expired reset link</h2>
            <p className="mt-6">
              It seems that the password reset link has expired or is invalid. Please
              return to the password reset page, verify your email address, and we
              will send you another link to reset your password.
            </p>
          </div>
          <div className="flex justify-center">
            <Button
              className="font-medium text-orange-600 dark:font-normal"
              variant="link"
              size="link-ghost"
              text="sm"
              asChild
            >
              <Link href="/forgot-password">
                <Icons.arrowLeft size={14} className="mr-1" /> Go back
              </Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
