import { CreateBlockDto, UpdateBlockDto } from "@lir/lib/dto";

import { Body, Controller, Patch, Post, UseGuards } from "@nestjs/common";

import { JwtGuard } from "~/auth/guards/jwt.guard";

import { BlockService } from "./block.service";

@UseGuards(JwtGuard)
@Controller("block")
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post()
  async createBlock(@Body() data: CreateBlockDto) {
    return this.blockService.createBlock(data);
  }

  @Patch()
  async updateBlock(@Body() data: UpdateBlockDto) {
    return this.blockService.updateBlock(data);
  }
}
