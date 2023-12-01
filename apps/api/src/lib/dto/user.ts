import { createZodDto } from "nestjs-zod";

import { userSchema, userWithTokensSchema } from "~/lib/validators/user";

export class UserDto extends createZodDto(userSchema) {}

export class UserWithTokensDto extends createZodDto(userWithTokensSchema) {}
