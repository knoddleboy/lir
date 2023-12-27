import { z } from "zod";

import { blockSchema } from "./block";

const requiredUpdateInput = blockSchema.required().pick({
  id: true,
});

const optionalUpdateInput = blockSchema.partial().pick({
  type: true,
  // nextId: true,
});

export const partialContentUpdateInput = z.object({
  content: blockSchema.shape.content.partial().optional(),
});

export const updateBlockSchema = requiredUpdateInput
  .merge(optionalUpdateInput)
  .merge(partialContentUpdateInput);

export type UpdateBlockInput = z.infer<typeof updateBlockSchema>;
