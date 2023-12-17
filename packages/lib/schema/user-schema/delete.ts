import { z } from "zod";

export const deleteUserSchema = z.object({
  password: z.string(),
});

export type DeleteUserInput = z.infer<typeof deleteUserSchema>;
