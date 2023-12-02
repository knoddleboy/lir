import { z } from "nestjs-zod/z";

export const configSchema = z.object({
  // general
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.coerce.number().default(3001),

  // database
  DATABASE_URL: z.string().url().startsWith("postgresql://"),

  // security
  BCRYPT_SALT_OR_ROUNDS: z.coerce.number().optional(),
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),

  // email
  EMAIL_FROM: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
});

export type Config = z.infer<typeof configSchema>;
