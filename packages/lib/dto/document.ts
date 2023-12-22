import { createZodDto } from "nestjs-zod";

import { deleteDocumentSchema, updateDocumentSchema } from "../schema";
import { createDocumentSchema } from "../schema/document/create";

export class CreateDocumentDto extends createZodDto(createDocumentSchema) {}

export class UpdateDocumentDto extends createZodDto(updateDocumentSchema) {}

export class DeleteDocumentDto extends createZodDto(deleteDocumentSchema) {}
