import { z } from "zod";

import { documentSchema } from "./document";

export const createDocumentSchema = documentSchema
  .pick({
    title: true,
  })
  .extend({
    createBlock: z.boolean(),
  });

export type CreateDocumentInput = z.infer<typeof createDocumentSchema>;
