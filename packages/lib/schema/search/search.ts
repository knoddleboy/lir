import { z } from "zod";

const searchSortSchema = z.object({
  sortBy: z.enum(["fixed", "byTitle", "dateCreated", "dateModified"]),
  sortDirection: z.enum(["asc", "desc"]).optional(),
});

export const searchSchema = z.object({
  query: z.string(),
  sort: searchSortSchema,
  skip: z.number().nonnegative(),
  take: z.number().nonnegative(),
});

export type SearchInput = z.infer<typeof searchSchema>;
