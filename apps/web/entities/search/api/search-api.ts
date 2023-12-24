import type { SearchDto } from "@lir/lib/dto";
import type { DocumentProps, SearchInput } from "@lir/lib/schema";

import type { AxiosResponse } from "axios";

import { apiClient } from "~/shared";

export const searchKeys = {
  search: {
    root: ["search"],
  },

  mutation: {
    searchDocuments: () => [...searchKeys.search.root, "searchDocuments"],
  },
};

export const searchDocuments = async (data: SearchInput) => {
  const response = await apiClient.post<
    DocumentProps[],
    AxiosResponse<DocumentProps[]>,
    SearchDto
  >("/search/documents", data);

  return response.data;
};
