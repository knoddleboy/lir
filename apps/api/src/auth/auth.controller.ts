import { Response } from "express";

import { Body, Controller, Post, Res, UseGuards } from "@nestjs/common";

import { SignupDto } from "~/dto/auth/signup";
import { UserDto } from "~/dto/user/user";
import { User } from "~/user/decorators/user.decorator";

import { AuthService } from "./auth.service";
import { JwtGuard } from "./guards/jwt.guard";
import { LocalGuard } from "./guards/local.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async signup(
    @Body() singupDto: SignupDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const user = await this.authService.signup(singupDto);
    return this.authService.handleAuthResponse(user, response);
  }

  @UseGuards(LocalGuard)
  @Post("login")
  async login(
    @User() user: UserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.handleAuthResponse(user, response);
  }

  @UseGuards(JwtGuard)
  @Post("logout")
  async logout(
    @User() user: UserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.logout(user, response);
  }
}
