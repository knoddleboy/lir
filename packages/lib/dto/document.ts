import { createZodDto } from "nestjs-zod";

import { updateDocumentSchema } from "../schema";
import { createDocumentSchema } from "../schema/document/create";

export class CreateDocumentDto extends createZodDto(createDocumentSchema) {}

export class UpdateDocumentDto extends createZodDto(updateDocumentSchema) {}
