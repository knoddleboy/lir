import { createZodDto } from "nestjs-zod";

import { deleteUserSchema, updateUserSchema } from "../schema";

export class UpdateUserDto extends createZodDto(updateUserSchema) {}

export class DeleteUserDto extends createZodDto(deleteUserSchema) {}
