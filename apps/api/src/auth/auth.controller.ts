import { Body, Controller, Post } from "@nestjs/common";

import { LoginDto } from "~/dto/auth/login";
import { SignupDto } from "~/dto/auth/signup";

import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() singupDto: SignupDto) {
    return this.authService.register(singupDto);
  }

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post("logout")
  async logout() {
    this.authService.logout();
  }
}
