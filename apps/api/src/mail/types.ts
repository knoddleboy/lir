export const TemplateType = {
  VerifyEmail: "verify-email",
  ForgotPasswordEmail: "forgot-password-email",
} as const;

export type VerifyEmailPayload = {
  user: {
    name: string;
    email: string;
  };
  verificationLink: string;
};

export type ForgotPasswordEmailPayload = {
  user: {
    name: string;
    email: string;
  };
  resetPasswordLink: string;
};

export type MailTemplatePayload =
  | {
      templateType: typeof TemplateType.VerifyEmail;
      payload: VerifyEmailPayload;
    }
  | {
      templateType: typeof TemplateType.ForgotPasswordEmail;
      payload: ForgotPasswordEmailPayload;
    };
