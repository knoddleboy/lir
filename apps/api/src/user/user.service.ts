import { Prisma } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";

import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    return await this.prismaService.user.create({ data });
  }

  async findOneById(id: string) {
    return await this.prismaService.user.findUniqueOrThrow({
      where: { id },
      include: { tokens: true },
    });
  }

  async findOneByIdentifier(identifier: Prisma.UserWhereUniqueInput) {
    return await this.prismaService.user.findUniqueOrThrow({
      where: identifier,
    });
  }

  async updateById(id: string, data: Prisma.UserUpdateArgs["data"]) {
    return await this.prismaService.user.update({
      where: { id },
      data,
    });
  }
}
