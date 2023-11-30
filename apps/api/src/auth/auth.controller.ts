import { Response } from "express";

import { Body, Controller, Post, Res } from "@nestjs/common";

import { LoginDto } from "~/dto/auth/login";
import { SignupDto } from "~/dto/auth/signup";

import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async register(
    @Body() singupDto: SignupDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const user = await this.authService.signup(singupDto);
    return this.authService.handleAuthResponse(user, response);
  }

  @Post("login")
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const user = await this.authService.login(loginDto);
    return this.authService.handleAuthResponse(user, response);
  }

  @Post("logout")
  async logout() {
    this.authService.logout();
  }
}
