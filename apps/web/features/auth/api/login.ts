import type { LoginDto } from "@lir/lib/dto";
import type { UserProps } from "@lir/lib/schema";

import { useMutation, type UseMutationResult } from "@tanstack/react-query";

import { sessionApi, sessionModel } from "~/entities/session";
import { queryClient } from "~/shared/api/query-client";

export const useLogin = (): UseMutationResult<UserProps, Error, LoginDto, unknown> =>
  useMutation({
    mutationKey: sessionApi.sessionKeys.mutation.login(),
    mutationFn: sessionApi.login,
    onSuccess: (data: UserProps) => {
      sessionModel.setUser(data);
      queryClient.setQueryData(["user"], data);
    },
  });
