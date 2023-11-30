import { ErrorResponseCode } from "@lir/lib/error";
import { authResponseSchema } from "@lir/lib/schema";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Response } from "express";

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";

import { AuthResponseDto } from "~/dto/auth/auth-response";
import { LoginDto } from "~/dto/auth/login";
import { SignupDto } from "~/dto/auth/signup";
import { UserDto } from "~/dto/user/user";
import { UserService } from "~/user/user.service";

import { PasswordService } from "./password/password.service";
import { TokenService } from "./token/token.service";
import { cookieOptionsFactory } from "./utils/cookie-options.factory";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService
  ) {}

  async signup(signupDto: SignupDto) {
    const hashedPassword = await this.passwordService.hash(signupDto.password);

    try {
      const user = await this.userService.create({
        name: signupDto.name,
        email: signupDto.email,
        password: hashedPassword,
      });

      // call to mail service

      return user;
    } catch (error) {
      if (
        // https://www.prisma.io/docs/reference/api-reference/error-reference#p2002
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new BadRequestException(ErrorResponseCode.UserAlreadyExists);
      }

      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.userService.findOneByIdentifier({
        email: loginDto.email,
      });

      this.validatePassword(loginDto.password, user.password);

      return user;
    } catch (error) {
      throw new BadRequestException(ErrorResponseCode.InvalidCredentials);
    }
  }

  async logout() {
    throw new Error("Unimplemented");
  }

  async handleAuthResponse(user: UserDto, response: Response<AuthResponseDto>) {
    const { accessToken, refreshToken } = await this.tokenService.refreshTokens(
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

  private async validatePassword(password: string, hashedPassword: string) {
    const isValid = await this.passwordService.validate(
      password,
      hashedPassword
    );

    if (!isValid) {
      throw new BadRequestException(ErrorResponseCode.InvalidCredentials);
    }
  }
}
