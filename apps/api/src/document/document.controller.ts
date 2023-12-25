import {
  CreateDocumentDto,
  UpdateDocumentDto,
  DeleteDocumentDto,
} from "@lir/lib/dto";

import { Body, Controller, Get, Patch, Post, UseGuards } from "@nestjs/common";

import { JwtGuard } from "~/auth/guards/jwt.guard";
import { User } from "~/user/decorators/user.decorator";

import { DocumentService } from "./document.service";

@UseGuards(JwtGuard)
@Controller("documents")
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get("getUserDocuments")
  async getUserRecords(@User("id") id: string) {
    return this.documentService.getUserDocuments(id);
  }

  @Post("createUserDocument")
  async createRecord(@User("id") id: string, @Body() data: CreateDocumentDto) {
    return this.documentService.createDocument(id, data);
  }

  @Patch("updateUserDocument")
  async updateDocument(@Body() data: UpdateDocumentDto) {
    return this.documentService.updateDocument(data);
  }

  @Post("deleteUserDocument")
  async deleteDocument(@Body() data: DeleteDocumentDto) {
    return this.documentService.deleteDocument(data);
  }
}