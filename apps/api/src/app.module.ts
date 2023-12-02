import { ZodValidationPipe } from "nestjs-zod";

import { Module } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";

import { AuthModule } from "~/auth/auth.module";
import { ConfigModule } from "~/config/config.module";
import { MailModule } from "~/mail/mail.module";
import { PrismaModule } from "~/prisma/prisma.module";
import { UserModule } from "~/user/user.module";

@Module({
  imports: [ConfigModule, AuthModule, PrismaModule, UserModule, MailModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
