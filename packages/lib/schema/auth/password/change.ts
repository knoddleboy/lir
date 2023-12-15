import { z } from "zod";

import { passwordSchema } from "../../shared";

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, { message: "Please enter your old password." }),
  newPassword: passwordSchema,
});

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
