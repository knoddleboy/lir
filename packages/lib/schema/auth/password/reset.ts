import { z } from "zod";

import { passwordSchema } from "../../shared";

export const resetPasswordSchema = z.object({
  newPassword: passwordSchema,
  requestId: z.string(),
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
