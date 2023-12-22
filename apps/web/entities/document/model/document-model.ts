import type {
  DocumentProps,
  UpdateDocumentInput,
  DeleteDocumentInput,
} from "@lir/lib/schema";

import { create, useStore, type StateCreator } from "zustand";

type DocumentState = {
  documents: DocumentProps[];
  setDocument: (updateInput: UpdateDocumentInput) => void;
  setDocuments: (documents: DocumentProps[]) => void;
  unsetDocument: (deleteInput: DeleteDocumentInput) => void;
};

const createDocumentSlice: StateCreator<DocumentState, [], [], DocumentState> = (
  set
) => ({
  documents: [],

  setDocument: ({ id, title }) => {
    set((state) => ({
      documents: state.documents.map((document) => {
        if (document.id !== id) {
          return document;
        }
        return {
          ...document,
          title,
        };
      }),
    }));
  },

  setDocuments: (documents) => {
    set((state) => ({
      documents: [...state.documents, ...documents],
    }));
  },

  unsetDocument: ({ id }) => {
    set((state) => ({
      documents: state.documents.filter((document) => document.id !== id),
    }));
  },
});

export const documentStore = create<DocumentState>((...a) => ({
  ...createDocumentSlice(...a),
}));

export const useDocument = (id: string) =>
  useStore(documentStore, (state) => state.documents.find((d) => d.id === id));

export const useDocuments = () =>
  useStore(documentStore, (state) => state.documents);

export const setDocument = (updateInput: UpdateDocumentInput) =>
  documentStore.getState().setDocument(updateInput);

export const setDocuments = (documents: DocumentProps[]) =>
  documentStore.getState().setDocuments(documents);

export const unsetDocument = (deleteInput: DeleteDocumentInput) =>
  documentStore.getState().unsetDocument(deleteInput);
