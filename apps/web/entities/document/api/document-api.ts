import type { CreateDocumentDto, UpdateDocumentDto } from "@lir/lib/dto";
import type {
  CreateDocumentInput,
  DocumentProps,
  UpdateDocumentInput,
} from "@lir/lib/schema";

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
    updateDocument: () => [...documentKeys.document.root, "updateDocument"],
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

export const updateDocument = async (data: UpdateDocumentInput) => {
  const response = await apiClient.patch<
    DocumentProps,
    AxiosResponse<DocumentProps>,
    UpdateDocumentDto
  >("/documents", data);

  return response.data;
};
