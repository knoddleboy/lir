import { passwordSchema } from "@lir/lib/schema";

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

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  newPassword: passwordSchema,
  requestId: z.string(),
});

export const changePasswordSchema = z.object({
  oldPassword: passwordSchema,
  newPassword: passwordSchema,
});
