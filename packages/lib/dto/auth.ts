import { createZodDto } from "nestjs-zod";

import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginUserSchema,
  resetPasswordSchema,
  signupUserSchema,
  verificationTokenSchema,
} from "../schema";

export class LoginDto extends createZodDto(loginUserSchema) {}

export class SignupDto extends createZodDto(signupUserSchema) {}

export class VerificationTokenDto extends createZodDto(verificationTokenSchema) {}

export class ForgotPasswordDto extends createZodDto(forgotPasswordSchema) {}

export class ResetPasswordDto extends createZodDto(resetPasswordSchema) {}

export class ChangePasswordDto extends createZodDto(changePasswordSchema) {}
