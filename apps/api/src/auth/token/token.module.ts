import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { UserModule } from "~/user/user.module";

import { TokenService } from "./token.service";

@Module({
  imports: [JwtModule, UserModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
