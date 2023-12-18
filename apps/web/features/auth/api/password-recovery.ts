import { useMutation } from "@tanstack/react-query";

import { sessionApi } from "~/entities/session";

export const useChangePassword = () =>
  useMutation({
    mutationFn: sessionApi.changePassword,
  });

export const useForgotPassword = () =>
  useMutation({
    mutationFn: sessionApi.forgotPassword,
  });

export const useResetPassword = () =>
  useMutation({
    mutationFn: sessionApi.resetPassword,
  });
