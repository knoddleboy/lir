import { createZodDto } from "nestjs-zod";

import {
  deleteDocumentSchema,
  getDocumentDataSchema,
  updateDocumentSchema,
} from "../schema";
import { createDocumentSchema } from "../schema/document/create";

export class GetDocumentDataDto extends createZodDto(getDocumentDataSchema) {}

export class CreateDocumentDto extends createZodDto(createDocumentSchema) {}

export class UpdateDocumentDto extends createZodDto(updateDocumentSchema) {}

export class DeleteDocumentDto extends createZodDto(deleteDocumentSchema) {}
