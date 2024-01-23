import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { documentModel } from "~/entities/document";
import { sessionApi, sessionModel } from "~/entities/session";
import { queryClient } from "~/shared/api/query-client";

export const useLogout = (): UseMutationResult<
  AxiosResponse<any, any>,
  Error,
  void,
  unknown
> =>
  useMutation({
    mutationKey: sessionApi.sessionKeys.mutation.logout(),
    mutationFn: sessionApi.logout,
    onSettled: () => {
      sessionModel.unsetUser();
      documentModel.unsetDocuments();
      queryClient.invalidateQueries({
        queryKey: sessionApi.sessionKeys.session.currentUser(),
      });
    },
  });
