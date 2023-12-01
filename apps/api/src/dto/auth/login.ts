import { createZodDto } from "nestjs-zod";

import { loginSchema } from "~/lib/validators/auth";

export class LoginDto extends createZodDto(loginSchema) {}
