import { Module } from "@nestjs/common";

import { HashingService } from "~/lib/services/hashing.service";
import { MailModule } from "~/mail/mail.module";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PasswordModule } from "./password/password.module";
import { PasswordService } from "./password/password.service";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { LocalStrategy } from "./strategy/local.strategy";
import { RefreshStrategy } from "./strategy/refresh.strategy";
import { TokenModule } from "./token/token.module";

@Module({
  imports: [TokenModule, MailModule, PasswordModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshStrategy,
    HashingService,
    PasswordService,
  ],
})
export class AuthModule {}
