import { createZodDto } from "nestjs-zod";

import {
  deleteUserSchema,
  updateUserSchema,
  userSchema,
} from "~/lib/validators/user";

export class UserDto extends createZodDto(userSchema) {}

export class UpdateUserDto extends createZodDto(updateUserSchema) {}

export class DeleteUserDto extends createZodDto(deleteUserSchema) {}
