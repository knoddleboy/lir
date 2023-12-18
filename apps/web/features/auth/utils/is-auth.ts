import { type NextRequest } from "next/server";

export const isAuth = (request: NextRequest) => {
  const access = request.cookies.get("Authorization")?.value;
  return !!access;
};
