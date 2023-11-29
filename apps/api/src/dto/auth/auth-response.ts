import { authResponseSchema } from "@lir/lib/schema";

import { createZodDto } from "nestjs-zod";

export class AuthResponseDto extends createZodDto(authResponseSchema) {}
