import { authResponseSchema } from "@lir/lib/schema";

import { createZodDto } from "nestjs-zod";

import { loginSchema } from "~/lib/validators/auth";
import { signupSchema } from "~/lib/validators/auth";

export class LoginDto extends createZodDto(loginSchema) {}

export class SignupDto extends createZodDto(signupSchema) {}

export class AuthResponseDto extends createZodDto(authResponseSchema) {}
