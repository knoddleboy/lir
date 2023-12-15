import type { z } from "zod";

import { userSchema } from "./user";

export const deleteUserSchema = userSchema.required().pick({
  password: true,
});

export type DeleteUserInput = z.infer<typeof deleteUserSchema>;
