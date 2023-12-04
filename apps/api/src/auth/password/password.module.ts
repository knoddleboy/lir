import { Module } from "@nestjs/common";

import { HashingService } from "~/lib/services/hashing.service";
import { MailService } from "~/mail/mail.service";

import { PasswordService } from "./password.service";

@Module({
  providers: [PasswordService, MailService, HashingService],
  exports: [PasswordService],
})
export class PasswordModule {}
