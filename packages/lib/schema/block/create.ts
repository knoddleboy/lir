import { z } from "zod";

import { blockSchema } from "./block";

export const createBlockSchema = blockSchema
  .pick({
    type: true,
    content: true,
    documentId: true,
  })
  .extend({
    prevId: z.string().nullable(),
  });

export type CreateBlockInput = z.infer<typeof createBlockSchema>;
