import { useQuery } from "@tanstack/react-query";

import { documentApi } from "~/entities/document";

export const useGetDocumentData = (documentId: string) =>
  useQuery({
    queryKey: documentApi.documentKeys.query.getDocumentData(documentId),
    queryFn: () => documentApi.getDocumentData({ documentId }),
    refetchOnWindowFocus: false,
  });
