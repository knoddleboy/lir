import * as z from "zod";

export const baseRecordSchema = z.object({
  id: z.string().optional(),
  type: z.enum(["document"]),
  title: z.string(),
  ownerId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type BaseRecord = z.infer<typeof baseRecordSchema>;

export type RecordContent = BaseRecord &
  Partial<{
    parentId: string;
    parent: RecordContent;
    content: RecordContent[];
  }>;

export const recordSchema: z.ZodType<RecordContent> = baseRecordSchema.extend({
  parentId: z.string().optional(),
  parent: z.lazy(() => recordSchema).optional(),
  content: z.lazy(() => recordSchema.array()).optional(),
});

export type CreateRecordInput = BaseRecord & RecordContent;
