import { Module } from "@nestjs/common";

import { BlockController } from "./block.controller";
import { BlockService } from "./block.service";

@Module({
  providers: [BlockService],
  controllers: [BlockController],
})
export class BlockModule {}
