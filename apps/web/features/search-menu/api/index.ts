import type { SearchDto } from "@lir/lib/dto";
import type { SearchResult } from "@lir/lib/schema";

import { useMutation, type UseMutationResult } from "@tanstack/react-query";

import { searchApi } from "~/entities/search";

export const useSearchDocuments = (): UseMutationResult<
  SearchResult,
  Error,
  SearchDto,
  unknown
> =>
  useMutation({
    mutationKey: searchApi.searchKeys.mutation.searchDocuments(),
    mutationFn: searchApi.searchDocuments,
  });
