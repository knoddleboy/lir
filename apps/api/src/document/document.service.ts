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
      where: { ownerId: userId },
      orderBy: { createdAt: "asc" },
    });
  }

  async createDocument(userId: string, input: CreateDocumentInput) {
    return await this.prismaService.document.create({
      data: {
        ...input,
        owner: { connect: { id: userId } },
      },
    });
  }

  async updateDocument(input: UpdateDocumentInput) {
    return await this.prismaService.document.update({
      where: { id: input.id },
      data: { title: input.title },
    });
  }

  async deleteDocument(input: DeleteDocumentInput) {
    return await this.prismaService.document.delete({
      where: { id: input.id },
    });
  }
}
