import { Request } from "express";

import { ExecutionContext, createParamDecorator } from "@nestjs/common";

import { UserWithTokensDto } from "~/dto/user/user";

export const User = createParamDecorator(
  (data: keyof UserWithTokensDto, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest() as Request;
    const user = request.user as UserWithTokensDto;

    return data ? user?.[data] : user;
  }
);
