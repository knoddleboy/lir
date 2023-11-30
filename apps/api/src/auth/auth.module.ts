import { Module } from "@nestjs/common";

import { UserModule } from "~/user/user.module";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PasswordModule } from "./password/password.module";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { LocalStrategy } from "./strategy/local.strategy";
import { TokenModule } from "./token/token.module";

@Module({
  imports: [UserModule, PasswordModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
