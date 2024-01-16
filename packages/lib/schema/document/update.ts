import { z } from "zod";

import { documentSchema } from "./document";

export const updateDocumentSchema = z.array(
  z.object({
    id: documentSchema.shape.id,
    title: documentSchema.partial().shape.title,
    content: documentSchema.partial().shape.content,
  })
);

export type UpdateDocumentInput = z.infer<typeof updateDocumentSchema>;
