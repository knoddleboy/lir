import * as z from "zod";

export const documentSchema = z.object({
  id: z.string(),
  title: z.string().nullable(),
  ownerId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type DocumentProps = z.infer<typeof documentSchema>;
