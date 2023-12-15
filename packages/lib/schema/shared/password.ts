import { z } from "zod";

import { isPasswordValid } from "../../validator";

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
