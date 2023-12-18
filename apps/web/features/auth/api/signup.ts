import { type UserProps } from "@lir/lib/schema";

import { useMutation } from "@tanstack/react-query";

import { sessionApi, sessionModel } from "~/entities/session";

export const useSignup = () =>
  useMutation({
    mutationKey: sessionApi.sessionKeys.mutation.signup(),
    mutationFn: sessionApi.signup,
    onSuccess: (data: UserProps) => sessionModel.setUser(data),
  });
