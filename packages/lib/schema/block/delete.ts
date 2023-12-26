import type { z } from "zod";

import { blockSchema } from "./block";

export const deleteBlockSchema = blockSchema.required().pick({
  id: true,
});

export type DeleteBlockInput = z.infer<typeof deleteBlockSchema>;
