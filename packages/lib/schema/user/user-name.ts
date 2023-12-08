import { z } from "zod";

export const userNameSchema = z
  .string()
  .min(3, { message: "Name must contain at least 3 characters" })
  .max(255, { message: "Name must not exceed 255 characters" })
  .regex(/^[a-zA-Z\s]+$/, {
    message: "Name can only contain letters and spaces",
  });
