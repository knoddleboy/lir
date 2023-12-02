export const TemplateType = {
  VerifyEmail: "verify-email",
} as const;

export type VerifyEmailPayload = {
  user: {
    name: string;
    email: string;
  };
  verificationLink: string;
};

export type MailTemplatePayload = {
  templateType: typeof TemplateType.VerifyEmail;
  payload: VerifyEmailPayload;
};
