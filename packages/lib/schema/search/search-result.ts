import { z } from "zod";

import { documentSchema } from "../document";

export const searchResultSchema = z.object({
  documents: documentSchema.array(),
  total: z.number().nonnegative(),
});

export type SearchResult = z.infer<typeof searchResultSchema>;
