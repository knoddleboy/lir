import type { z } from "zod";

import { userSchema } from "../../user-schema";

export const signupUserSchema = userSchema
  .pick({
    name: true,
    email: true,
    password: true,
  })
  .transform((originalValue) => ({
    ...originalValue,
    email: originalValue.email.toLowerCase(),
  }));

export type SingupUserInput = z.infer<typeof signupUserSchema>;
