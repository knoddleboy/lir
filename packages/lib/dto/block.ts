import { createZodDto } from "nestjs-zod";

import { createBlockSchema, updateBlockSchema } from "../schema";
import { deleteBlockSchema } from "../schema/block/delete";

export class CreateBlockDto extends createZodDto(createBlockSchema) {}

export class UpdateBlockDto extends createZodDto(updateBlockSchema) {}

export class DeleteBlockDto extends createZodDto(deleteBlockSchema) {}
