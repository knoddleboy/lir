import { z } from "zod";

import { userSchema } from "../../user-schema";

export const loginUserSchema = userSchema
  .pick({
    email: true,
  })
  // Extending here to avoid exposing password validation rules on the login page
  .extend({
    password: z.string().min(1, { message: "Password is required" }),
  })
  .transform((originalValue) => ({
    ...originalValue,
    email: originalValue.email.toLowerCase(),
  }));

export type LoginUserInput = z.infer<typeof loginUserSchema>;
