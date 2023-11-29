import { authResponseSchema, jwtPayloadSchema } from "@lir/lib/schema";

import { Response } from "express";

import { Body, Controller, Post, Res } from "@nestjs/common";

import { AuthResponseDto } from "~/dto/auth/auth-response";
import { LoginDto } from "~/dto/auth/login";
import { SignupDto } from "~/dto/auth/signup";
import { UserDto } from "~/dto/user/user";

import { AuthService } from "./auth.service";
import { cookieOptionsFactory } from "./utils/cookie-options.factory";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async register(
    @Body() singupDto: SignupDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const user = await this.authService.signup(singupDto);
    return this.handleAuthResponse(user, response);
  }

  @Post("login")
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const user = await this.authService.login(loginDto);
    return this.handleAuthResponse(user, response);
  }

  @Post("logout")
  async logout() {
    this.authService.logout();
  }

  private async handleAuthResponse(
    user: UserDto,
    response: Response<AuthResponseDto>
  ) {
    const { accessToken, refreshToken } = await this.refreshTokens(
      user.id,
      user.email
    );

    response.cookie(
      "Authorization",
      accessToken,
      cookieOptionsFactory("access")
    );
    response.cookie("Refresh", refreshToken, cookieOptionsFactory("refresh"));

    const responseBody = authResponseSchema.parse(user);

    response.status(200).send(responseBody);
  }

  private async refreshTokens(id: string, email: string) {
    const payload = jwtPayloadSchema.parse({ sub: id, email });

    const [accessToken, refreshToken] = await Promise.all([
      this.authService.generateToken("access", payload),
      this.authService.generateToken("refresh", payload),
    ]);

    // store refresh token

    return { accessToken, refreshToken };
  }
}
