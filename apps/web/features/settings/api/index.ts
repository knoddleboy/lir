import type { UpdateUserDto } from "@lir/lib/dto";
import type { UserProps } from "@lir/lib/schema";

import { useMutation, type UseMutationResult } from "@tanstack/react-query";

import { sessionApi, sessionModel } from "~/entities/session";
import { queryClient } from "~/shared/api/query-client";

export const useUpdateUser = (): UseMutationResult<
  UserProps,
  Error,
  UpdateUserDto,
  unknown
> =>
  useMutation({
    mutationKey: sessionApi.sessionKeys.mutation.updateUser(),
    mutationFn: sessionApi.updateUser,
    onSuccess: (data: UserProps) => sessionModel.setUser(data),
  });

export const useDeleteUser = () =>
  useMutation({
    mutationFn: sessionApi.deleteUser,
    onSuccess: () => {
      sessionModel.unsetUser();
      queryClient.removeQueries({
        queryKey: sessionApi.sessionKeys.session.currentUser(),
        type: "inactive",
      });
    },
  });
