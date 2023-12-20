import { CreateDocumentInput } from "@lir/lib/schema";

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
        ownerId: userId,
      },
    });
  }
}
