import type { z } from "zod";

import { blockSchema } from "./block";

const requiredUpdateInput = blockSchema.required().pick({
  id: true,
});

const optionalUpdateInput = blockSchema.partial().pick({
  type: true,
  content: true,
  // nextId: true,
});

export const updateBlockSchema = requiredUpdateInput.merge(optionalUpdateInput);

export type UpdateBlockInput = z.infer<typeof updateBlockSchema>;
