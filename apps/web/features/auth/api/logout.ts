import { useMutation } from "@tanstack/react-query";

import { documentModel } from "~/entities/document";
import { sessionApi, sessionModel } from "~/entities/session";
import { queryClient } from "~/shared/api/query-client";

export const useLogout = () =>
  useMutation({
    mutationKey: sessionApi.sessionKeys.mutation.logout(),
    mutationFn: sessionApi.logout,
    onSettled: () => {
      sessionModel.unsetUser();
      documentModel.unsetDocuments();
      queryClient.removeQueries({
        queryKey: sessionApi.sessionKeys.session.currentUser(),
        type: "inactive",
      });
    },
  });
