import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { UserModule } from "~/user/user.module";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PasswordModule } from "./password/password.module";

@Module({
  imports: [UserModule, PasswordModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
