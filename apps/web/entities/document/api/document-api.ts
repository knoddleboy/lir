import type { CreateDocumentDto } from "@lir/lib/dto";
import type { CreateDocumentInput, DocumentProps } from "@lir/lib/schema";

import type { AxiosResponse } from "axios";

import { apiClient } from "~/shared";

export const documentKeys = {
  document: {
    root: ["document"],
  },

  query: {
    getUserDocuments: () => [...documentKeys.document.root, "getUserDocuments"],
  },

  mutation: {
    createDocument: () => [...documentKeys.document.root, "createDocument"],
  },
};

export const getUserDocuments = async () => {
  const response = await apiClient.get<
    DocumentProps[],
    AxiosResponse<DocumentProps[]>
  >("/documents/getUserDocuments");

  return response.data;
};

export const createDocument = async (data: CreateDocumentInput) => {
  const response = await apiClient.post<
    DocumentProps,
    AxiosResponse<DocumentProps>,
    CreateDocumentDto
  >("/documents", data);

  return response.data;
};
