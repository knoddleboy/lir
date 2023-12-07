import { z } from "nestjs-zod/z";

export const passwordErrorMessage = {
  message: "invalid_password",
};

export const passwordSchema = z
  .password()
  .min(8, passwordErrorMessage)
  .atLeastOne("digit", passwordErrorMessage)
  .atLeastOne("lowercase", passwordErrorMessage)
  .atLeastOne("uppercase", passwordErrorMessage);
