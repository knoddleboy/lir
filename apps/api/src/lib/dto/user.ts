import { deleteUserSchema, updateUserSchema, userSchema } from "@lir/lib/schema";

import { createZodDto } from "nestjs-zod";

export class UserDto extends createZodDto(userSchema) {}

export class UpdateUserDto extends createZodDto(updateUserSchema) {}

export class DeleteUserDto extends createZodDto(deleteUserSchema) {}
