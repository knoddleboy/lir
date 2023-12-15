import { cookies } from "next/headers";

export const isAuth = () =>
  cookies().get("Authorization") && cookies().get("Refresh");
