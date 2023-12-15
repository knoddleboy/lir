import { useMutation } from "@tanstack/react-query";

import { sessionApi } from "~/entities/session";

export const useForgotPassword = () =>
  useMutation({
    mutationFn: sessionApi.forgotPassword,
  });
