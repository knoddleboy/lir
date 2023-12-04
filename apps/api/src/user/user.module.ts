import { Module } from "@nestjs/common";

import { AvatarModule } from "~/avatar/avatar.module";
import { AvatarService } from "~/avatar/avatar.service";
import { HashingService } from "~/lib/services/hashing.service";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [AvatarModule],
  providers: [UserService, HashingService, AvatarService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
