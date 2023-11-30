import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { UserModule } from "~/user/user.module";

import { PasswordModule } from "../password/password.module";
import { TokenService } from "./token.service";

@Module({
  imports: [JwtModule, UserModule, PasswordModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
