import type { DocumentProps } from "@lir/lib/schema";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { documentApi } from "~/entities/document";

export const useGetDocumentData = (
  documentId: string
): UseQueryResult<DocumentProps, Error> =>
  useQuery({
    queryKey: documentApi.documentKeys.query.getDocumentData(documentId),
    queryFn: () => documentApi.getDocumentData({ documentId }),
    refetchOnWindowFocus: false,
  });
