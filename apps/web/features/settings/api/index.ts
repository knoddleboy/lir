import { type UserProps } from "@lir/lib/schema";

import { useMutation } from "@tanstack/react-query";

import { sessionApi, sessionModel } from "~/entities/session";

export const useUpdateUser = () =>
  useMutation({
    mutationKey: sessionApi.sessionKeys.mutation.updateUser(),
    mutationFn: sessionApi.updateUser,
    onSuccess: (data: UserProps) => sessionModel.setUser(data),
  });

export const useDeleteUser = () =>
  useMutation({
    mutationFn: sessionApi.deleteUser,
  });
