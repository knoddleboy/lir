import { type NextRequest, type NextResponse } from "next/server";

import { type Route, type ObjectValues } from "~/shared";

export interface Middleware {
  /**
   * @property global
   * @description - Allows you to apply middleware to all page routes. If true,
   * the set of routes from 'paths' property will be ignored.
   * @default - true
   */
  global: boolean;
  /**
   * @property paths
   * @description - Allows you to apply middleware to a specific set of pages.
   * Ignored if global property is true
   * @example - ['/home', '/sign-in']
   * @default - []
   */
  paths: ObjectValues<typeof Route>[];
  /**
   * @method handler
   * @description - Allows you to process the route. Return a new NextResponse
   * if you need to redirect or overwrite the route, or do not return anything
   * if actions on the route are not required
   */
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
