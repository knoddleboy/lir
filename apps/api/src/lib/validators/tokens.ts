import { idSchema } from "@lir/lib/schema";

import { z } from "zod";

export const tokenSchema = z.object({
  id: idSchema,
  refreshToken: z.string(),

  expiresAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),

  userId: idSchema,
});
