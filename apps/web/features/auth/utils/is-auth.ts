import { type NextRequest } from "next/server";

export const isAuth = (request: NextRequest) => {
  const access = request.cookies.get("Authorization")?.value;
  const refresh = request.cookies.get("Refresh")?.value;
  return !!access && !!refresh;
};
