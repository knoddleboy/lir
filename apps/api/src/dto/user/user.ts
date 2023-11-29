import { idSchema } from "@lir/lib/schema";

import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

const nameSchema = z
  .string()
  .min(3)
  .max(255)
  .regex(/^[a-zA-Z\s]+$/, {
    message: "Name can only contain letters and spaces.",
  });

const passwordSchema = z
  .password()
  .min(8)
  .atLeastOne("digit")
  .atLeastOne("special")
  .atLeastOne("lowercase")
  .atLeastOne("uppercase");

export const userSchema = z.object({
  id: idSchema,
  name: nameSchema,

  email: z.string().email(),
  emailVerified: z.date().nullable(),

  password: passwordSchema,

  createdAt: z.date(),
  updatedAt: z.date(),
});

export class UserDto extends createZodDto(userSchema) {}
