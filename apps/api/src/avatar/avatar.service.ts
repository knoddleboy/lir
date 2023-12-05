import { DEFAULT_AVATAR } from "@lir/lib";

import { randomUUID as v4 } from "crypto";
import { Response } from "express";
import { PrismaService } from "nestjs-prisma";

import { Injectable } from "@nestjs/common";

@Injectable()
export class AvatarService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAvatar(avatarId: string, response: Response) {
    try {
      const { data } = await this.prismaService.avatar.findUniqueOrThrow({
        where: { avatarId },
        select: { data: true },
      });

      const decoded = data.toString().replace("data:image/png;base64,", "");
      const buffer = Buffer.from(decoded, "base64");

      response.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": buffer.length,
      });

      response.end(buffer);
    } catch (error) {
      response.writeHead(302, {
        Location: DEFAULT_AVATAR,
      });

      response.end();
      return;
    }
  }

  async uploadAvatar(userId: string, data: string) {
    const avatarId = v4();

    await this.prismaService.avatar.upsert({
      where: { userId },
      create: {
        userId,
        avatarId,
        data,
      },
      update: {
        avatarId,
        data,
      },
    });

    return `/api/avatar/${avatarId}.png`;
  }

  async deleteAvatar(userId: string) {
    await this.prismaService.avatar.delete({
      where: { userId },
    });
  }
}
