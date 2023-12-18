import { type NextRequest, NextResponse } from "next/server";

import { isAuth } from "~/features/auth";
import { type Middleware, Route } from "~/shared";

export class UnAuthMiddleware implements Middleware {
  global = false;
  paths = [
    Route.Login,
    Route.Signup,
    Route.VerifyEmail,
    Route.ForgotPassword,
    Route.ResetPassword,
  ];

  handler(request: NextRequest) {
    const isAuthenticated = isAuth(request);
    // TODO: workaround for workspace "/:documentId"
    const redirectUrl = new URL(Route.Home, request.url);
    if (isAuthenticated) return NextResponse.redirect(redirectUrl);
  }
}
