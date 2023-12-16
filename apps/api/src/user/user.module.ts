import { Module } from "@nestjs/common";

import { AvatarModule } from "~/avatar/avatar.module";
import { AvatarService } from "~/avatar/avatar.service";
import { HashingService } from "~/lib/services/hashing.service";
import { MailModule } from "~/mail/mail.module";
import { MailService } from "~/mail/mail.service";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [AvatarModule, MailModule],
  controllers: [UserController],
  providers: [UserService, HashingService, AvatarService, MailService],
  exports: [UserService],
})
export class UserModule {}
