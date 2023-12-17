import type { z } from "zod";

import { userSchema } from "./user";

export const updateUserSchema = userSchema.partial().pick({
  name: true,
  email: true,
  avatar: true,
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
