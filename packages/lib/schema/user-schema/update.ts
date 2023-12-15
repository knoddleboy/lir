import type { z } from "zod";

import { userSchema } from "./user";

export const updateUserSchema = userSchema
  .partial()
  .pick({
    name: true,
    email: true,
    password: true,
    avatar: true,
  })
  .transform((data) => ({
    ...data,
    avatar: data.avatar ?? "",
  }));

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
