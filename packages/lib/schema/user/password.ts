import { z } from "nestjs-zod/z";

import { isPasswordValid } from "../../validator";

// export const passwordSchema = z
//   .password()
//   .min(8, { message: "invalid_password_min_length" })
//   .atLeastOne("digit", { message: "invalid_password_one_digit" })
//   .atLeastOne("lowercase", { message: "invalid_password_one_lowercase" })
//   .atLeastOne("uppercase", { message: "invalid_password_one_uppercase" });

export const passwordSchema = z.string().superRefine((data, ctx) => {
  const result = isPasswordValid(data);
  Object.keys(result).map((key) => {
    if (!result[key as keyof typeof result]) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: key,
        path: [key],
      });
    }
  });
});
