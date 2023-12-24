import { SearchDto } from "@lir/lib/dto";

import { Body, Controller, Post, UseGuards } from "@nestjs/common";

import { JwtGuard } from "~/auth/guards/jwt.guard";
import { User } from "~/user/decorators/user.decorator";

import { SearchService } from "./search.service";

@UseGuards(JwtGuard)
@Controller("search")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post("documents")
  async searchDocument(@User("id") userId: string, @Body() data: SearchDto) {
    return this.searchService.searchDocuments(userId, data);
  }
}
