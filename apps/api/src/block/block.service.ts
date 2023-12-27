import {
  CreateBlockInput,
  DeleteBlockInput,
  UpdateBlockInput,
} from "@lir/lib/schema";

import { Prisma } from "@prisma/client";
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
    const blockToUpdate = await this.prismaService.block.findUnique({
      where: { id: input.id },
    });

    if (!blockToUpdate) return;

    // TODO: is this even a good way?
    const updateContentInput = {
      ...(blockToUpdate.content as Prisma.JsonObject),
      ...input.content,
    };

    return await this.prismaService.block.update({
      where: { id: input.id },
      data: {
        ...input,
        content: updateContentInput,
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

  async deleteBlock(input: DeleteBlockInput) {
    const deletedBlock = await this.prismaService.block.delete({
      where: { id: input.id },
      include: {
        prev: true,
        next: true,
      },
    });

    if (!deletedBlock.prev) {
      return deletedBlock;
    }

    await this.prismaService.block.update({
      where: {
        id: deletedBlock.prev.id,
      },
      data: {
        next: {
          ...(deletedBlock.next
            ? {
                connect: {
                  id: deletedBlock.next.id,
                },
              }
            : {
                disconnect: {
                  id: deletedBlock.id,
                },
              }),
        },
      },
    });

    return deletedBlock;
  }
}
