import { AuthResponseMessage } from "../messages";

export const AuthResponse = {
  PasswordResetEmailSent: { message: AuthResponseMessage.PasswordResetEmailSent },
  PasswordReset: { message: AuthResponseMessage.PasswordReset },
} as const;
