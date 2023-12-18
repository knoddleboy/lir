export const Route = {
  Home: "/",
  App: "/:documentId",
  Settings: "/settings",
  Signup: "/signup",
  Login: "/login",
  ForgotPassword: "/forgot-password",
  ResetPassword: "/forgot-password/:requestId",
} as const;
