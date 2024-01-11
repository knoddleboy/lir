import type {
  CreateDocumentDto,
  UpdateDocumentDto,
  DeleteDocumentDto,
} from "@lir/lib/dto";
import type {
  DocumentProps,
  CreateDocumentInput,
  UpdateDocumentInput,
  DeleteDocumentInput,
  GetDocumentDataInput,
} from "@lir/lib/schema";

import type { AxiosResponse } from "axios";

import { apiClient } from "~/shared";

export const documentKeys = {
  document: {
    root: ["document"],
  },

  query: {
    getUserDocuments: () => [...documentKeys.document.root, "getUserDocuments"],
    getDocumentData: (documentId: string) => [
      ...documentKeys.document.root,
      `getDocumentData${documentId}`,
    ],
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

export const getDocumentData = async (data: GetDocumentDataInput) => {
  const response = await apiClient.get<DocumentProps, AxiosResponse<DocumentProps>>(
    `/documents/getDocumentData/${data.documentId}`
  );

  return response.data;
};

export const createDocument = async (data: CreateDocumentInput) => {
  const response = await apiClient.post<
    DocumentProps,
    AxiosResponse<DocumentProps>,
    CreateDocumentDto
  >("/documents/createUserDocument", data);

  return response.data;
};

export const updateDocument = async (data: UpdateDocumentInput) => {
  const response = await apiClient.patch<
    DocumentProps,
    AxiosResponse<DocumentProps>,
    UpdateDocumentDto
  >("/documents/updateUserDocument", data);

  return response.data;
};

export const deleteDocument = async (data: DeleteDocumentInput) => {
  const response = await apiClient.post<
    DocumentProps,
    AxiosResponse<DocumentProps>,
    DeleteDocumentDto
  >("/documents/deleteUserDocument", data);

  return response.data;
};
