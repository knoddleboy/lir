import { type NextRequest, NextResponse } from "next/server";

import { AuthMiddleware, UnAuthMiddleware } from "~/features/auth";
import { withMiddleware } from "~/shared";

const middlewares = [new AuthMiddleware(), new UnAuthMiddleware()];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/_next") || // exclude Next.js internals
    pathname.startsWith("/static") || // exclude static files
    /\.(.*)$/.test(pathname) // exclude all files in the public folder
  ) {
    return response;
  }

  return await withMiddleware(request, response, middlewares);
}

export const config = {
  matches: ["/**"],
};
