import { idSchema, userNameSchema, passwordSchema } from "@lir/lib/schema";

import { z } from "nestjs-zod/z";

export const userSchema = z.object({
  id: idSchema,
  name: userNameSchema,

  email: z.string().email(),
  emailVerified: z.date().nullable(),

  password: passwordSchema,

  createdAt: z.date(),
  updatedAt: z.date(),
});

export const updateUserSchema = userSchema.partial().pick({
  name: true,
  email: true,
  password: true,
});

export const deleteUserSchema = userSchema.required().pick({
  password: true,
});
