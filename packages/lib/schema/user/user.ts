import { z } from "zod";

import { passwordSchema } from "../auth/password";
import { idSchema } from "../shared/id";
import { emailSchema } from "./email";
import { userNameSchema } from "./user-name";

export const userSchema = z.object({
  id: idSchema,
  name: userNameSchema,

  email: emailSchema,
  emailVerified: z.date().nullable(),

  password: passwordSchema,

  avatar: z.string().nullable(),

  createdAt: z.date(),
  updatedAt: z.date(),
});
