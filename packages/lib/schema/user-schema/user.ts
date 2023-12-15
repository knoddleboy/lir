import { z } from "zod";

import { emailSchema, userNameSchema, passwordSchema, idSchema } from "../shared";

// TODO: use zod-prisma generated types
export const userSchema = z.object({
  id: idSchema,
  name: userNameSchema,

  email: emailSchema,
  emailVerified: z.date().nullable(),

  password: passwordSchema,

  avatar: z.string().nullable(),
  identityProvider: z.enum(["EMAIL"]),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export const userPropsSchema = userSchema.omit({
  password: true,
});

export type UserProps = z.TypeOf<typeof userPropsSchema>;
