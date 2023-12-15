import { type Metadata } from "next";

import { FotgotPasswordForm } from "~/features/auth/forgot-password";

export const metadata: Metadata = {
  title: "Forgot Password?",
};

export default function ForgotPasswordPage() {
  return <FotgotPasswordForm />;
}
