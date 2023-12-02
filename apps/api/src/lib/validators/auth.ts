import { z } from "zod";

import { userSchema } from "./user";

export const loginSchema = userSchema.pick({ email: true, password: true });

export const signupSchema = userSchema.pick({
  name: true,
  email: true,
  password: true,
});

export const verificationTokenSchema = z.object({
  token: z.string().length(64),
});
