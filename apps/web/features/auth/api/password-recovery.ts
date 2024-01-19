import type { ChangePasswordDto } from "@lir/lib/dto";

import { useMutation, type UseMutationResult } from "@tanstack/react-query";

import { sessionApi } from "~/entities/session";

export const useChangePassword = (): UseMutationResult<
  void,
  Error,
  ChangePasswordDto,
  unknown
> =>
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
