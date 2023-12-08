import {
  authResponseSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  loginUserSchema,
  resetPasswordSchema,
  signupUserSchema,
  verificationTokenSchema,
} from "@lir/lib/schema";

import { createZodDto } from "nestjs-zod";

export class LoginDto extends createZodDto(loginUserSchema) {}

export class SignupDto extends createZodDto(signupUserSchema) {}

export class AuthResponseDto extends createZodDto(authResponseSchema) {}

export class VerificationTokenDto extends createZodDto(verificationTokenSchema) {}

export class ForgotPasswordDto extends createZodDto(forgotPasswordSchema) {}

export class ResetPasswordDto extends createZodDto(resetPasswordSchema) {}

export class ChangePasswordDto extends createZodDto(changePasswordSchema) {}
