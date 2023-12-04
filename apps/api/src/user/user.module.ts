import { Module } from "@nestjs/common";

import { HashingService } from "~/lib/services/hashing.service";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  providers: [UserService, HashingService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
