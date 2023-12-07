import { z } from "zod";

import { idSchema } from "./id";
import { passwordSchema } from "./password";
import { userNameSchema } from "./user-name";

export const userSchema = z.object({
  id: idSchema,
  name: userNameSchema,

  email: z.string().email({ message: "Invalid email address" }),
  emailVerified: z.date().nullable(),

  password: passwordSchema,

  avatar: z.string().nullable(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export const loginUserSchema = userSchema
  .pick({
    email: true,
  })
  .extend({
    password: z.string().min(1, { message: "Password is required" }),
  });

export const signupUserSchema = userSchema.pick({
  name: true,
  email: true,
  password: true,
});
