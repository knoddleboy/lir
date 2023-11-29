import { createZodDto } from "nestjs-zod";

import { userSchema } from "../user/user";

export const signupSchema = userSchema.pick({
  name: true,
  email: true,
  password: true,
});

export class SignupDto extends createZodDto(signupSchema) {}
