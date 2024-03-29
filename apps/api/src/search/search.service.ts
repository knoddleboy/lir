import { SearchInput } from "@lir/lib/schema";

import { PrismaService } from "nestjs-prisma";

import { Injectable } from "@nestjs/common";

@Injectable()
export class SearchService {
  constructor(private readonly prismaService: PrismaService) {}

  async searchDocuments(userId: string, { query, sort, skip, take }: SearchInput) {
    const documents = await this.prismaService.document.findMany({
      where: {
        userId,
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
      orderBy: {
        ...(sort.sortBy === "byTitle" ? { title: sort.sortDirection } : {}),
        ...(sort.sortBy === "dateModified" ? { updatedAt: sort.sortDirection } : {}),
        ...(sort.sortBy === "dateCreated" ? { createdAt: sort.sortDirection } : {}),
      },
      skip,
      take,
    });

    const total = await this.prismaService.document.count({
      where: {
        userId,
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
    });

    return { documents, total };
  }
}
