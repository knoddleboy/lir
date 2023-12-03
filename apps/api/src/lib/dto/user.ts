import { createZodDto } from "nestjs-zod";

import { userSchema } from "~/lib/validators/user";

export class UserDto extends createZodDto(userSchema) {}
