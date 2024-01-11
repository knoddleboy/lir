import { z } from "zod";

import { documentSchema } from "./document";

export const updateDocumentSchema = z.object({
  id: documentSchema.shape.id,
  title: documentSchema.partial().shape.title,
  content: z.any(),
});

export type UpdateDocumentInput = z.infer<typeof updateDocumentSchema>;
