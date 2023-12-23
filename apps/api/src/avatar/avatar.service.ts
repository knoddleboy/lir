import { randomUUID as v4 } from "crypto";
import { Response } from "express";
import { PrismaService } from "nestjs-prisma";

import { Injectable } from "@nestjs/common";

import { cropImage } from "~/lib/crop-image";

@Injectable()
export class AvatarService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAvatar(avatarId: string, response: Response) {
    try {
      const { data } = await this.prismaService.avatar.findUniqueOrThrow({
        where: { avatarId: avatarId.replace(".png", "") },
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
      return response.send({});
    }
  }

  async uploadAvatar(userId: string, input: string) {
    const avatarId = v4();

    const data = await cropImage(input);

    if (!data) return;

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
    // Using `deleteMany` as a replacement for a unimplemented yet `deleteIfExists`
    // @see https://github.com/prisma/prisma/issues/4072
    await this.prismaService.avatar.deleteMany({
      where: { userId },
    });
  }
}
