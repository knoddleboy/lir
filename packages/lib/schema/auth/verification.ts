import { z } from "zod";

export const verificationTokenSchema = z.object({
  token: z.string().length(64),
});
