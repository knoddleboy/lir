import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";

import { JwtGuard } from "~/auth/guards/jwt.guard";
import { DeleteUserDto, UpdateUserDto, UserDto } from "~/lib/dto/user";

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
  async update(@User() user: UserDto, @Body() data: UpdateUserDto) {
    return this.userService.updateUserProfile(user, data);
  }

  @Post()
  async delete(@User("id") id: string, @Body() { password }: DeleteUserDto) {
    return this.userService.deleteUser(id, password);
  }

  @Delete()
  async deleteWithoutPassword(@User("id") id: string) {
    return this.userService.deleteUserWithoutPassword(id);
  }
}
