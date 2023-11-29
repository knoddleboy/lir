import { Module } from "@nestjs/common";

import { UserModule } from "~/user/user.module";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PasswordModule } from "./password/password.module";

@Module({
  imports: [UserModule, PasswordModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
