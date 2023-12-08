import { z } from "zod";

export const emailSchema = z
  .string()
  .min(1, { message: "Email address is required" })
  .email({ message: "Invalid email address" });
