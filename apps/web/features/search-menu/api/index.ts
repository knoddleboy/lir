import { useMutation } from "@tanstack/react-query";

import { searchApi } from "~/entities/search";

export const useSearchDocuments = () =>
  useMutation({
    mutationKey: searchApi.searchKeys.mutation.searchDocuments(),
    mutationFn: searchApi.searchDocuments,
  });
