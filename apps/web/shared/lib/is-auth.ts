import { cookies } from "next/headers";

export const isAuth = () => {
  const access = cookies().get("Authorization");
  const refresh = cookies().get("Refresh");

  return !!access && !!refresh;
};
