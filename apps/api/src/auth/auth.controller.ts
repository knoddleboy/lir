import {
  ChangePasswordDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  SignupDto,
  VerificationTokenDto,
} from "@lir/lib/dto";
import type { User as UserType } from "@lir/prisma";

import { Response } from "express";

import { Body, Controller, Get, Post, Query, Res, UseGuards } from "@nestjs/common";

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
    @User() user: UserType,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.handleAuthResponse(user, response);
  }

  @UseGuards(RefreshGuard)
  @Post("refresh")
  async refresh(
    @User() user: UserType,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.handleAuthResponse(user, response);
  }

  @UseGuards(JwtGuard)
  @Post("logout")
  async logout(
    @User() user: UserType,
    @Res({ passthrough: true }) response: Response
  ) {
    try {
      return this.authService.logout(user, response);
    } catch (error) {}
  }

  @Get("verify-email")
  async verifyEmail(
    @Query() query: VerificationTokenDto,
    @Res() response: Response
  ) {
    return this.authService.verifyEmail(query.token, response);
  }

  @UseGuards(JwtGuard)
  @Post("verify-password")
  async verifyPassword(
    @User("password") hashedPassword: string,
    @Body() password: string
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

  @Post("verify-reset-request")
  async verifyResetRequest(@Body() { requestId }: { requestId: string }) {
    return this.passwordService.verifyResetRequest(requestId);
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
    @User() user: UserType,
    @Body() { oldPassword, newPassword }: ChangePasswordDto
  ) {
    return this.passwordService.changePassword(user, oldPassword, newPassword);
  }
}
