import { AuthResponseMessage } from "../messages";

export type TAuthResponse = Record<
  keyof typeof AuthResponseMessage,
  { message: AuthResponseMessage }
>;

export const AuthResponse: TAuthResponse = {
  PasswordResetEmailSent: { message: AuthResponseMessage.PasswordResetEmailSent },
  PasswordReset: { message: AuthResponseMessage.PasswordReset },
} as const;
