import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { HashingService } from "~/lib/services/hashing.service";
import { UserModule } from "~/user/user.module";

import { TokenService } from "./token.service";

@Module({
  imports: [JwtModule, UserModule],
  providers: [TokenService, HashingService],
  exports: [TokenService],
})
export class TokenModule {}
