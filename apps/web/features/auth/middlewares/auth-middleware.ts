import { type NextRequest, NextResponse } from "next/server";

import { sessionApi } from "~/entities/session";
import { isAuth } from "~/features/auth";
import { type Middleware, Route } from "~/shared";

export class AuthMiddleware implements Middleware {
  global = false;

  paths = [Route.Documents, Route.Settings];

  handler(request: NextRequest) {
    const isAuthenticated = isAuth(request);
    const redirectUrl = new URL(Route.Login, request.url);

    if (!isAuthenticated) {
      try {
        sessionApi.handleRefresh();
      } catch (error) {
        return NextResponse.redirect(redirectUrl);
      }
    }
  }
}
