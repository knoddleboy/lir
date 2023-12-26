import * as z from "zod";

export enum BlockType {
  Title = "title",
  Heading1 = "heading1",
  Heading2 = "heading2",
  Text = "text",
}

export const blockSchema = z.object({
  id: z.string(),
  documentId: z.string(),
  type: z.nativeEnum(BlockType),
  content: z.string(), // json
  nextId: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type BlockProps = z.infer<typeof blockSchema>;
