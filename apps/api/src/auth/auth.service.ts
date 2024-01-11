import { WEBAPP_URL } from "@lir/lib";
import { LoginDto, SignupDto } from "@lir/lib/dto";
import { ErrorResponseCode } from "@lir/lib/error";
import { UserProps } from "@lir/lib/schema";

import type { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
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

import { HashingService } from "~/lib/services/hashing.service";
import { MailService } from "~/mail/mail.service";

import { PasswordService } from "./password/password.service";
import { TokenService } from "./token/token.service";
import { cookieOptionsFactory } from "./utils/cookie-options.factory";

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly mailService: MailService,
    private readonly prismaService: PrismaService,
    private readonly hashingService: HashingService,
    private readonly passwordService: PasswordService
  ) {}

  async signup(signupDto: SignupDto): Promise<User> {
    const hashedPassword = await this.hashingService.hash(signupDto.password);

    try {
      const user = await this.prismaService.user.create({
        data: {
          name: signupDto.name,
          email: signupDto.email,
          password: hashedPassword,
        },
      });

      this.prismaService.document.create({
        data: {
          title: "Untitled",
          userId: user.id,
          content: {},
        },
      });

      this.mailService.sendEmailVerification(user.name, user.email);

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

  async logout(user: User, response: Response) {
    await this.tokenService.deleteRefreshToken(user.id);

    response.clearCookie("Authorization");
    response.clearCookie("Refresh");

    response.status(200).send({});
  }

  async verifyEmail(token: string, response: Response) {
    const foundToken = await this.prismaService.verificationToken.findFirst({
      where: { token },
    });

    if (!foundToken) {
      throw new BadRequestException(ErrorResponseCode.InvalidVerificationToken);
    }

    if (dayjs(foundToken.expiresAt).isBefore(dayjs())) {
      throw new GoneException(ErrorResponseCode.ExpiredVerificationToken);
    }

    await this.prismaService.user.update({
      where: { email: foundToken.identifier },
      data: { emailVerified: new Date() },
    });

    await this.prismaService.verificationToken.delete({
      where: {
        id: foundToken.id,
      },
    });

    return response.status(200).redirect(`${WEBAPP_URL}/d`);
  }

  async handleAuthResponse(user: User, response: Response<UserProps>) {
    const { accessToken, refreshToken } = await this.tokenService.refreshTokens(
      user.id,
      user.email
    );

    response.cookie("Authorization", accessToken, cookieOptionsFactory("access"));
    response.cookie("Refresh", refreshToken, cookieOptionsFactory("refresh"));

    response.status(200).send({
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      avatar: user.avatar,
      identityProvider: user.identityProvider,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async validateUser({ email, password }: LoginDto): Promise<User> {
    try {
      const user = await this.prismaService.user.findUniqueOrThrow({
        where: { email },
      });

      const isValid = await this.passwordService.verifyPassword(
        password,
        user.password
      );

      if (!isValid) {
        throw new BadRequestException(ErrorResponseCode.InvalidCredentials);
      }

      return user;
    } catch (error) {
      throw new BadRequestException(ErrorResponseCode.InvalidCredentials);
    }
  }
}
