import { Prisma, User } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";

import { Injectable } from "@nestjs/common";

import { UserWithTokens } from "~/lib/types";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prismaService.user.create({ data });
  }

  async findOneById(id: string): Promise<UserWithTokens> {
    return await this.prismaService.user.findUniqueOrThrow({
      where: { id },
      include: { tokens: true },
    });
  }

  async findOneByIdentifier(
    identifier: Prisma.UserWhereUniqueInput
  ): Promise<UserWithTokens> {
    return await this.prismaService.user.findUniqueOrThrow({
      where: identifier,
      include: { tokens: true },
    });
  }

  async updateById(id: string, data: Prisma.UserUpdateArgs["data"]): Promise<User> {
    return await this.prismaService.user.update({
      where: { id },
      data,
    });
  }
}
