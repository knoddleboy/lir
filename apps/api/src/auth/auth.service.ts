import { ErrorResponseCode } from "@lir/lib/error";
import { AuthResponse } from "@lir/lib/responses";
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
import { HashingService } from "~/lib/services/hashing.service";
import { MailService } from "~/mail/mail.service";
import { UserService } from "~/user/user.service";

import { TokenService } from "./token/token.service";
import { cookieOptionsFactory } from "./utils/cookie-options.factory";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService,
    private readonly prismaService: PrismaService,
    private readonly hashingService: HashingService
  ) {}

  async signup(signupDto: SignupDto): Promise<User> {
    const hashedPassword = await this.hashingService.hash(signupDto.password);

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
    await this.tokenService.deleteRefreshToken(user.id);

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

  async forgotPassword(email: string, response: Response) {
    const expiresAt = dayjs().add(8, "hours").toDate();
    const createdPasswordResetId =
      await this.prismaService.passwordResetRequest.create({
        data: { email, expiresAt },
      });

    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: { name: true, email: true },
    });

    // In case a user misspells their email, do not send a reset link
    // but show email sent message anyway
    if (!user) {
      return response.status(201).json(AuthResponse.PasswordResetEmailSent);
    }

    await this.mailService.sendMail({
      templateType: "forgot-password-email",
      payload: {
        user,
        resetPasswordLink: `http://localhost:3000/api/auth/forgot-password/${createdPasswordResetId}`,
      },
    });

    return response.status(201).json(AuthResponse.PasswordResetEmailSent);
  }

  async resetPassword(newPassword: string, requestId: string, response: Response) {
    const foundRequest =
      await this.prismaService.passwordResetRequest.findFirstOrThrow({
        where: { id: requestId },
      });

    const hashedPassword = await this.hashingService.hash(newPassword);

    // Although non-existing emails are handled in `forgotPassword`,
    // we may want to return a 404 in case something went wrong here
    try {
      await this.prismaService.user.update({
        where: { email: foundRequest.email },
        data: { password: hashedPassword },
      });
    } catch (error) {
      return response.status(404).end();
    }

    await this.prismaService.passwordResetRequest.update({
      where: { id: requestId },
      // set the expiry date to now to invalidate the request
      data: { expiresAt: new Date() },
    });

    return response.status(201).json(AuthResponse.PasswordReset);
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

  async validateUser({ email, password }: LoginDto): Promise<User> {
    try {
      const user = await this.userService.findOneByIdentifier({ email });

      await this.validatePassword(password, user.password);

      return user;
    } catch (error) {
      throw new BadRequestException(ErrorResponseCode.InvalidCredentials);
    }
  }

  private async validatePassword(password: string, hashedPassword: string) {
    const isValid = await this.hashingService.validate(password, hashedPassword);

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
          expiresAt: dayjs().add(1, "D").toDate(),
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
