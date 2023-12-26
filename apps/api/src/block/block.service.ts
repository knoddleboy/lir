import { CreateBlockInput, UpdateBlockInput } from "@lir/lib/schema";

import { PrismaService } from "nestjs-prisma";

import { Injectable } from "@nestjs/common";

@Injectable()
export class BlockService {
  constructor(private readonly prismaService: PrismaService) {}

  async createBlock(input: CreateBlockInput) {
    const prevBlock = await this.prismaService.block.findUnique({
      where: { id: input.prevId },
    });

    return await this.prismaService.block.create({
      data: {
        type: input.type,
        content: input.content,
        document: {
          connect: {
            id: input.documentId,
          },
        },
        // Previous block now points to the newly created block.
        prev: {
          connect: {
            id: input.prevId,
          },
        },
        // Next block of the previous block now has a parent, which is the newly created block.
        // before: blockPrev -> blockPrevNext -> ...
        // after:  blockPrev -> blockNew -> blockPrevNext -> ...
        ...(prevBlock!.nextId
          ? {
              next: {
                connect: {
                  id: prevBlock!.nextId,
                },
              },
            }
          : {}),
      },
    });
  }

  async updateBlock(input: UpdateBlockInput) {
    return await this.prismaService.block.update({
      where: { id: input.id },
      data: {
        ...input,
        document: {
          update: {
            data: {
              updatedAt: new Date(),
            },
          },
        },
      },
    });
  }
}
