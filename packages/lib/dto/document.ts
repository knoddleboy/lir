import { createZodDto } from "nestjs-zod";

import { createDocumentSchema } from "../schema/document/create";

export class CreateDocumentDto extends createZodDto(createDocumentSchema) {}
