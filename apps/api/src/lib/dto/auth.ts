import { authResponseSchema } from "@lir/lib/schema";

import { createZodDto } from "nestjs-zod";

import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  verificationTokenSchema,
} from "~/lib/validators/auth";
import { signupSchema } from "~/lib/validators/auth";

export class LoginDto extends createZodDto(loginSchema) {}

export class SignupDto extends createZodDto(signupSchema) {}

export class AuthResponseDto extends createZodDto(authResponseSchema) {}

export class VerificationTokenDto extends createZodDto(verificationTokenSchema) {}

export class ForgotPasswordDto extends createZodDto(forgotPasswordSchema) {}

export class ResetPasswordDto extends createZodDto(resetPasswordSchema) {}

export class ChangePasswordDto extends createZodDto(changePasswordSchema) {}
