import {
  CreateDocumentInput,
  DeleteDocumentInput,
  UpdateDocumentInput,
} from "@lir/lib/schema";

import { PrismaService } from "nestjs-prisma";

import { Injectable } from "@nestjs/common";

@Injectable()
export class DocumentService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserDocuments(userId: string) {
    return await this.prismaService.document.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        title: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getDocumentData(documentId: string) {
    return await this.prismaService.document.findUnique({
      where: { id: documentId },
    });
  }

  async createDocument(userId: string, input: CreateDocumentInput) {
    return await this.prismaService.document.create({
      data: {
        title: input.title,
        user: { connect: { id: userId } },
        content: {},
      },
    });
  }

  async updateDocument(input: UpdateDocumentInput) {
    return await this.prismaService.document.update({
      where: { id: input.id },
      data: {
        ...(input.title !== undefined ? { title: input.title } : {}),
        ...(input.content ? { content: input.content } : {}),
      },
    });
  }

  async deleteDocument({ id: documentId }: DeleteDocumentInput) {
    // const deleteDocumentBlocks = this.prismaService.block.deleteMany({
    //   where: { documentId },
    // });

    return await this.prismaService.document.delete({
      where: { id: documentId },
    });

    // const [, deletedDocument] = await this.prismaService.$transaction([
    //   deleteDocumentBlocks,
    //   deleteDocument,
    // ]);

    // return deletedDocument;
  }
}
