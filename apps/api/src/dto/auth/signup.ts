import { createZodDto } from "nestjs-zod";

import { signupSchema } from "~/lib/validators/auth";

export class SignupDto extends createZodDto(signupSchema) {}
