import { useMutation } from "@tanstack/react-query";

import { sessionApi } from "~/entities/session";

export const useChangePassword = () =>
  useMutation({
    mutationFn: sessionApi.changePassword,
  });
