import type { z } from "zod";

import { userSchema } from "../../user-schema";

export const signupUserSchema = userSchema.pick({
  name: true,
  email: true,
  password: true,
});

export type SingupUserInput = z.infer<typeof signupUserSchema>;
