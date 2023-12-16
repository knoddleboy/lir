import { ISendMailOptions, MailerService } from "@nestjs-modules/mailer";
import { Injectable, InternalServerErrorException } from "@nestjs/common";

import { MailTemplatePayload } from "./types";

@Injectable()
export class MailBaseService {
  constructor(private readonly mailerService: MailerService) {}

  private optionsFactory({
    payload,
    templateType,
  }: MailTemplatePayload): ISendMailOptions {
    const options = {
      to: payload.user.email,
    } as ISendMailOptions;

    switch (templateType) {
      case "verify-email": {
        options.subject = "Lir: Verify your account";
        options.template = "./verify-email.hbs";
        options.context = {
          name: payload.user.name,
          url: payload.verificationLink,
        };
        break;
      }

      case "forgot-password-email": {
        options.subject = "Lir: Password reset request";
        options.template = "./forgot-password-email.hbs";
        options.context = {
          name: payload.user.name,
          url: payload.resetPasswordLink,
        };
        break;
      }

      default:
        throw new InternalServerErrorException(/** Invalid `templateType` */);
    }

    return options;
  }

  async sendMail(payload: MailTemplatePayload): Promise<void> {
    const options = this.optionsFactory(payload);
    await this.mailerService.sendMail(options);
  }
}
