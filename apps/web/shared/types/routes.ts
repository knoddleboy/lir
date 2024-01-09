export const Route = {
  Home: "/",
  Overview: "/d",
  Documents: "/d/:documentId",
  Settings: "/settings",
  Signup: "/signup",
  VerifyEmail: "/signup/verify-email",
  Login: "/login",
  ForgotPassword: "/forgot-password",
  ResetPassword: "/forgot-password/:requestId",
} as const;
