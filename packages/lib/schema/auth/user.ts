import { z } from "zod";

import { userSchema } from "../user/user";

export const loginUserSchema = userSchema
  .pick({
    email: true,
  })
  // Extending here to avoid exposing password validation rules on the login page
  .extend({
    password: z.string().min(1, { message: "Password is required" }),
  });

export const signupUserSchema = userSchema.pick({
  name: true,
  email: true,
  password: true,
});

export const updateUserSchema = userSchema
  .partial()
  .pick({
    name: true,
    email: true,
    password: true,
    avatar: true,
  })
  .transform((data) => ({
    ...data,
    avatar: data.avatar ?? "",
  }));

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export const deleteUserSchema = userSchema.required().pick({
  password: true,
});
