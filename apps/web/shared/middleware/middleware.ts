import { type NextRequest, type NextResponse } from "next/server";

import { type Route, type ObjectValues } from "~/shared";

export interface Middleware {
  global: boolean;
  paths: ObjectValues<typeof Route>[];
  handler: MiddlewareFn;
}

export type MiddlewareFn = (
  req: NextRequest,
  res: NextResponse
) =>
  | Promise<NextResponse>
  | Promise<NextResponse | void>
  | Promise<void>
  | NextResponse
  | void;
