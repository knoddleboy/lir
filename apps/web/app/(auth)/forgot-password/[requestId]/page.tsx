import { type Metadata } from "next";

import { ResetPasswordForm } from "~/components/forms/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
};

interface ResetPasswordPageProps {
  params: {
    requestId: string;
  };
}

export default function ResetPasswordPage({
  params: { requestId },
}: ResetPasswordPageProps) {
  return (
    <div className="mb-24 w-full max-w-[360px] space-y-8">
      <div className="space-y-3">
        <h2 className="text-center text-4xl font-bold">Reset your password</h2>
      </div>
      <ResetPasswordForm requestId={requestId} />
    </div>
  );
}
