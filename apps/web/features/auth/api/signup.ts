import type { SignupDto } from "@lir/lib/dto";
import type { UserProps } from "@lir/lib/schema";

import { useMutation, type UseMutationResult } from "@tanstack/react-query";

import { sessionApi, sessionModel } from "~/entities/session";

export const useSignup = (): UseMutationResult<
  UserProps,
  Error,
  SignupDto,
  unknown
> =>
  useMutation({
    mutationKey: sessionApi.sessionKeys.mutation.signup(),
    mutationFn: sessionApi.signup,
    onSuccess: (data: UserProps) => sessionModel.setUser(data),
  });
