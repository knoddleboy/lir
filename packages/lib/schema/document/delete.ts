import type { z } from "zod";

import { documentSchema } from "./document";

export const deleteDocumentSchema = documentSchema.required().pick({
  id: true,
});

export type DeleteDocumentInput = z.infer<typeof deleteDocumentSchema>;
