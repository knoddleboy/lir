import { createZodDto } from "nestjs-zod";

import { userSchema } from "../user/user";

export const loginSchema = userSchema.pick({ email: true, password: true });

export class LoginDto extends createZodDto(loginSchema) {}
