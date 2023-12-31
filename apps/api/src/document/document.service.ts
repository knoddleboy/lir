import {
  Alignment,
  BlockContent,
  CreateDocumentInput,
  DeleteDocumentInput,
  UpdateDocumentInput,
} from "@lir/lib/schema";

import { PrismaService } from "nestjs-prisma";

import { Injectable } from "@nestjs/common";

import { traverseBlockArray } from "~/lib/traverse-block-array";

@Injectable()
export class DocumentService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserDocuments(userId: string) {
    return await this.prismaService.document.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: "asc" },
    });
  }

  async getDocumentData(documentId: string) {
    const blocks = await this.prismaService.block.findMany({
      where: { documentId },
    });

    return {
      blocks: traverseBlockArray(blocks),
    };
  }

  async createDocument(userId: string, input: CreateDocumentInput) {
    return await this.prismaService.document.create({
      data: {
        title: input.title,
        owner: { connect: { id: userId } },
        ...(input.createBlock
          ? {
              content: {
                create: {
                  type: "text",
                  content: {
                    title: [[""]],
                    formats: {
                      emphasis: [],
                      fontSize: 16,
                    },
                    alignment: Alignment.Left,
                    lineSpacing: 1.2,
                  } as BlockContent,
                },
              },
            }
          : {}),
      },
      include: {
        content: true,
      },
    });
  }

  async updateDocument(input: UpdateDocumentInput) {
    return await this.prismaService.document.update({
      where: { id: input.id },
      data: { title: input.title },
    });
  }

  async deleteDocument({ id: documentId }: DeleteDocumentInput) {
    const deleteDocumentBlocks = this.prismaService.block.deleteMany({
      where: { documentId },
    });

    const deleteDocument = this.prismaService.document.delete({
      where: { id: documentId },
    });

    const [, deletedDocument] = await this.prismaService.$transaction([
      deleteDocumentBlocks,
      deleteDocument,
    ]);

    return deletedDocument;
  }
}
