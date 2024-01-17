import type { z } from "zod";

import { documentSchema } from "./document";

export const createDocumentSchema = documentSchema.pick({
  title: true,
  content: true,
});

export type CreateDocumentInput = z.infer<typeof createDocumentSchema>;
