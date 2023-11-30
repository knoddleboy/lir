import { Request } from "express";

import { ExecutionContext, createParamDecorator } from "@nestjs/common";

import { UserDto } from "~/dto/user/user";

export const User = createParamDecorator(
  (data: keyof UserDto, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest() as Request;
    const user = request.user as UserDto;

    return data ? user?.[data] : user;
  }
);
