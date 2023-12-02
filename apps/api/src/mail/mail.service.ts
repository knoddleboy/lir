import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

import { MailOptions, mailOptionsFactory } from "./mail-options.factory";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(options: MailOptions): Promise<void> {
    await this.mailerService.sendMail(mailOptionsFactory(options));
  }
}
