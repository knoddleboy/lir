import { userSchema } from "@lir/lib/schema";

import { z } from "nestjs-zod/z";

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

export const deleteUserSchema = userSchema.required().pick({
  password: true,
});
