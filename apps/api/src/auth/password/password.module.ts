import { Module } from "@nestjs/common";

import { HashingService } from "~/lib/services/hashing.service";
import { MailBaseService } from "~/mail/mail-base.service";

import { PasswordService } from "./password.service";

@Module({
  providers: [PasswordService, MailBaseService, HashingService],
  exports: [PasswordService],
})
export class PasswordModule {}
