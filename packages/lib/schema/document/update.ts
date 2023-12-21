import type { z } from "zod";

import { documentSchema } from "./document";

export const updateDocumentSchema = documentSchema.required().pick({
  id: true,
  title: true,
});

export type UpdateDocumentInput = z.infer<typeof updateDocumentSchema>;
