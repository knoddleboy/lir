import {
  CreateDocumentInput,
  DeleteDocumentInput,
  UpdateDocumentInput,
} from "@lir/lib/schema";
import { Prisma } from "@lir/prisma";

import { PrismaService } from "nestjs-prisma";

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";

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
        content: input.content || {},
        user: { connect: { id: userId } },
      },
    });
  }

  async updateDocument(input: UpdateDocumentInput) {
    const updateQueries = input.map(({ id, title, content }) => {
      const data: Prisma.DocumentUpdateInput = {};

      if (title !== undefined) {
        data.title = title;
      }

      if (content) {
        data.content = content;
      }

      return this.prismaService.document.update({
        where: { id },
        data,
      });
    });

    try {
      const results = await this.prismaService.$transaction(updateQueries);
      const lastUpdated = results[results.length - 1];
      return lastUpdated;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async deleteDocument({ id: documentId }: DeleteDocumentInput) {
    return await this.prismaService.document.delete({
      where: { id: documentId },
    });
  }
}
