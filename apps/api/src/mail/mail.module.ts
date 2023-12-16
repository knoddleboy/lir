import { join } from "path";

import { MailerModule, MailerOptions } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { Config } from "~/config/schema";

import { MailBaseService } from "./mail-base.service";
import { MailService } from "./mail.service";

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Config>): MailerOptions => {
        const from = configService.get<string>("EMAIL_FROM");

        const smtpHost = configService.get<string>("SMTP_HOST");
        const smtpPort = configService.get<number>("SMTP_PORT");
        const smtpUser = configService.get<string | undefined>("SMTP_USER");
        const smtpPass = configService.get<string | undefined>("SMTP_PASS");

        const transport: MailerOptions["transport"] = {
          host: smtpHost,
          port: smtpPort,
          auth:
            smtpUser && smtpPass
              ? {
                  user: smtpUser,
                  pass: smtpPass,
                }
              : undefined,
          secure: smtpPort === 465,
        };

        const template: MailerOptions["template"] = {
          dir: join(__dirname, "templates"),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        };

        return {
          defaults: { from },
          transport,
          template,
        };
      },
    }),
  ],
  providers: [MailService, MailBaseService],
  exports: [MailService, MailBaseService],
})
export class MailModule {}
