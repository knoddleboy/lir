import { useMutation } from "@tanstack/react-query";

import { sessionApi, sessionModel } from "~/entities/session";
import { queryClient } from "~/shared/api/query-client";

export const useLogout = () =>
  useMutation({
    mutationKey: sessionApi.sessionKeys.mutation.signup(),
    mutationFn: sessionApi.logout,
    onSettled: () => {
      sessionModel.unsetUser();
      queryClient.removeQueries({
        queryKey: sessionApi.sessionKeys.session.currentUser(),
        type: "inactive",
      });
    },
  });
