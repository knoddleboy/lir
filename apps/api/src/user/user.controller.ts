import { DeleteUserDto, UpdateUserDto } from "@lir/lib/dto";
import type { User as UserType } from "@lir/prisma";

import { Response } from "express";

import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";

import { JwtGuard } from "~/auth/guards/jwt.guard";

import { User } from "./decorators/user.decorator";
import { UserService } from "./user.service";

@UseGuards(JwtGuard)
@Controller("me")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async get(@User("id") id: string) {
    return this.userService.getUserInfo(id);
  }

  @Patch()
  async update(@User() user: UserType, @Body() data: UpdateUserDto) {
    return this.userService.updateUser(user, data);
  }

  @Post()
  async delete(
    @User("id") id: string,
    @Body() { password }: DeleteUserDto,
    @Res() response: Response
  ) {
    await this.userService.deleteUser(id, password, response);
  }

  @Delete()
  async deleteWithoutPassword(@User("id") id: string, @Res() response: Response) {
    return this.userService.deleteUserWithoutPassword(id, response);
  }
}
