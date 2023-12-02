import { ErrorResponseCode } from "@lir/lib/error";
import { authResponseSchema } from "@lir/lib/schema";

import { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { randomBytes } from "crypto";
import dayjs from "dayjs";
import { Response } from "express";
import { PrismaService } from "nestjs-prisma";

import {
  BadRequestException,
  GoneException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";

import { AuthResponseDto, LoginDto, SignupDto } from "~/lib/dto/auth";
import { UserDto } from "~/lib/dto/user";
import { UserWithTokens } from "~/lib/types";
import { MailService } from "~/mail/mail.service";
import { UserService } from "~/user/user.service";

import { PasswordService } from "./password/password.service";
import { TokenService } from "./token/token.service";
import { cookieOptionsFactory } from "./utils/cookie-options.factory";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService,
    private readonly prismaService: PrismaService
  ) {}

  async signup(signupDto: SignupDto): Promise<User> {
    const hashedPassword = await this.passwordService.hash(signupDto.password);

    try {
      const user = await this.userService.create({
        name: signupDto.name,
        email: signupDto.email,
        password: hashedPassword,
      });

      this.sendEmailVerification(user.name, user.email);

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

  async logout(user: UserDto, response: Response) {
    await this.tokenService.deleteToken(user.id);

    response.clearCookie("Authorization");
    response.clearCookie("Refresh");

    response.status(200).send({});
  }

  async verifyEmail(token: string) {
    const foundToken = await this.prismaService.verificationToken.findFirst({
      where: { token },
    });

    if (!foundToken) {
      throw new BadRequestException(ErrorResponseCode.InvalidVerificationToken);
    }

    if (dayjs(foundToken.expiresAt).isBefore(dayjs())) {
      throw new GoneException(ErrorResponseCode.ExpiredVerificationToken);
    }

    await this.userService.updateByIdentifier(
      { email: foundToken.identifier },
      { emailVerified: new Date() }
    );

    await this.prismaService.verificationToken.delete({
      where: {
        id: foundToken.id,
      },
    });
  }

  async handleAuthResponse(user: UserDto, response: Response<AuthResponseDto>) {
    const { accessToken, refreshToken } = await this.tokenService.refreshTokens(
      user.id,
      user.email
    );

    response.cookie("Authorization", accessToken, cookieOptionsFactory("access"));
    response.cookie("Refresh", refreshToken, cookieOptionsFactory("refresh"));

    const responseBody = authResponseSchema.parse(user);

    response.status(200).send(responseBody);
  }

  async validateUser({ email, password }: LoginDto): Promise<UserWithTokens> {
    try {
      const user = await this.userService.findOneByIdentifier({ email });

      await this.validatePassword(password, user.password);

      return user;
    } catch (error) {
      throw new BadRequestException(ErrorResponseCode.InvalidCredentials);
    }
  }

  private async validatePassword(password: string, hashedPassword: string) {
    const isValid = await this.passwordService.validate(password, hashedPassword);

    if (!isValid) {
      throw new BadRequestException(ErrorResponseCode.InvalidCredentials);
    }
  }

  private async sendEmailVerification(name: string, email: string) {
    try {
      const token = randomBytes(32).toString("hex");
      const params = new URLSearchParams({ token });

      await this.prismaService.verificationToken.create({
        data: {
          identifier: email,
          token,
          expiresAt: new Date(Date.now() + 1000 * 10), // in 1d
        },
      });

      await this.mailService.sendMail({
        templateType: "verify-email",
        payload: {
          user: { name, email },
          verificationLink: `http://localhost:3001/api/auth/verify-email?${params.toString()}`,
        },
      });
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
