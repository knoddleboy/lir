import { Response } from "express";

import { Body, Controller, Get, Post, Query, Res, UseGuards } from "@nestjs/common";

import {
  ChangePasswordDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  SignupDto,
  VerificationTokenDto,
} from "~/lib/dto/auth";
import { UserDto } from "~/lib/dto/user";
import { User } from "~/user/decorators/user.decorator";

import { AuthService } from "./auth.service";
import { JwtGuard } from "./guards/jwt.guard";
import { LocalGuard } from "./guards/local.guard";
import { RefreshGuard } from "./guards/refresh.guard";
import { PasswordService } from "./password/password.service";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly passwordService: PasswordService
  ) {}

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

  @UseGuards(RefreshGuard)
  @Post("refresh")
  async refresh(
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

  @Get("verify-email")
  async verifyEmail(@Query() query: VerificationTokenDto) {
    return this.authService.verifyEmail(query.token);
  }

  @UseGuards(JwtGuard)
  @Post("verify-password")
  async verifyPassword(
    @User("password") hashedPassword: string,
    @Body() password: UserDto["password"]
  ) {
    return this.passwordService.verifyPassword(password, hashedPassword);
  }

  @Post("forgot-password")
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
    @Res() response: Response
  ) {
    return this.passwordService.forgotPassword(forgotPasswordDto.email, response);
  }

  @Post("reset-password")
  async resetPassword(
    @Body() { newPassword, requestId }: ResetPasswordDto,
    @Res() response: Response
  ) {
    return this.passwordService.resetPassword(newPassword, requestId, response);
  }

  @UseGuards(JwtGuard)
  @Post("change-password")
  async changePassword(
    @User() user: UserDto,
    @Body() { oldPassword, newPassword }: ChangePasswordDto
  ) {
    return this.passwordService.changePassword(user, oldPassword, newPassword);
  }
}
