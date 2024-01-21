import type { User as PrismaUser } from "@lir/prisma";

import { Request } from "express";

import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const User = createParamDecorator(
  (data: keyof PrismaUser, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest() as Request;
    const user = request.user as PrismaUser;

    return data ? user?.[data] : user;
  }
);
