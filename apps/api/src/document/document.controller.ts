import { CreateDocumentDto } from "@lir/lib/dto";

import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";

import { JwtGuard } from "~/auth/guards/jwt.guard";
import { User } from "~/user/decorators/user.decorator";

import { DocumentService } from "./document.service";

@Controller("documents")
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @UseGuards(JwtGuard)
  @Get("getUserDocuments")
  async getUserRecords(@User("id") id: string) {
    return this.documentService.getUserDocuments(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  async createRecord(@User("id") id: string, @Body() data: CreateDocumentDto) {
    return this.documentService.createDocument(id, data);
  }
}
