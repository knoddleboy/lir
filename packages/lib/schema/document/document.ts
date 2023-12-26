import * as z from "zod";

import { blockSchema } from "../block";

export const documentSchema = z.object({
  id: z.string(),
  title: z.string().nullable(),
  ownerId: z.string(),
  content: blockSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type DocumentProps = z.infer<typeof documentSchema>;
