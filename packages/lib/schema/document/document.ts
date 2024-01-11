import * as z from "zod";

export const documentSchema = z.object({
  id: z.string(),
  title: z.string().nullable(),
  userId: z.string(),
  content: z.any(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type DocumentProps = z.infer<typeof documentSchema>;
