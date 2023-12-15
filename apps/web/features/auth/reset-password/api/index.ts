import { useMutation } from "@tanstack/react-query";

import { sessionApi } from "~/entities/session";

export const useResetPassword = () =>
  useMutation({
    mutationFn: sessionApi.resetPassword,
  });
