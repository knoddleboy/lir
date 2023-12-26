import { z } from "zod";

export const getDocumentDataSchema = z.object({
  documentId: z.string(),
});

export type GetDocumentDataInput = z.infer<typeof getDocumentDataSchema>;
