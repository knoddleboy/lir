import { Prisma, User } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";

import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prismaService.user.create({ data });
  }

  async findOneById(id: string): Promise<User> {
    return await this.prismaService.user.findUniqueOrThrow({
      where: { id },
    });
  }

  async findOneByIdentifier(identifier: Prisma.UserWhereUniqueInput): Promise<User> {
    return await this.prismaService.user.findUniqueOrThrow({
      where: identifier,
    });
  }

  async updateById(id: string, data: Prisma.UserUpdateArgs["data"]): Promise<User> {
    return await this.prismaService.user.update({
      where: { id },
      data,
    });
  }

  async updateByIdentifier(
    identifier: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput
  ): Promise<User> {
    return await this.prismaService.user.update({
      where: identifier,
      data,
    });
  }
}
