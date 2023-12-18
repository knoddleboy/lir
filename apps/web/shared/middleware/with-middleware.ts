import { type NextRequest, type NextResponse } from "next/server";

import { type Middleware } from "~/shared";

export async function withMiddleware(
  request: NextRequest,
  response: NextResponse,
  middlewares: Middleware[]
) {
  const pathname = request.nextUrl.pathname;
  let nextResponse: NextResponse | null = null;

  for (const { global, paths = [], handler } of middlewares) {
    if (!global && !paths.filter((path) => pathname.startsWith(path)).length) {
      continue;
    }

    nextResponse = (await handler(request, response)) ?? null;
    if (nextResponse) return nextResponse;
  }
}
