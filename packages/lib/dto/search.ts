import { createZodDto } from "nestjs-zod";

import { searchSchema } from "../schema/search";

export class SearchDto extends createZodDto(searchSchema) {}
