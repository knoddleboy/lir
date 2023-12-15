import { type UserProps } from "@lir/lib/schema";

import { useMutation } from "@tanstack/react-query";

import { sessionApi, sessionModel } from "~/entities/session";
import { queryClient } from "~/shared/api/query-client";

export const useLogin = () =>
  useMutation({
    mutationKey: sessionApi.sessionKeys.mutation.login(),
    mutationFn: sessionApi.login,
    onSuccess: (data: UserProps) => {
      sessionModel.setUser(data);
      queryClient.setQueryData(["user"], data);
    },
  });
