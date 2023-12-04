import { z } from "zod";

export const userNameSchema = z
  .string()
  .min(3)
  .max(255)
  .regex(/^[a-zA-Z\s]+$/, {
    message: "Name can only contain letters and spaces.",
  });
