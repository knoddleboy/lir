import { userSchema } from "./user";

export const loginSchema = userSchema.pick({ email: true, password: true });

export const signupSchema = userSchema.pick({
  name: true,
  email: true,
  password: true,
});
