import { APP_URL } from "@lir/lib";
import { ErrorResponseCode } from "@lir/lib/error";
import { AuthResponse } from "@lir/lib/responses";

import dayjs from "dayjs";
import { Response } from "express";
import { PrismaService } from "nestjs-prisma";

import { BadRequestException, Injectable } from "@nestjs/common";

import { UserDto } from "~/lib/dto/user";
import { HashingService } from "~/lib/services/hashing.service";
import { MailService } from "~/mail/mail.service";

@Injectable()
export class PasswordService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
    private readonly hashingService: HashingService
  ) {}

  async verifyPassword(password: string, hashedPassword: string) {
    return await this.hashingService.validate(password, hashedPassword);
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
        resetPasswordLink: `${APP_URL}/forgot-password/${createdPasswordResetId}`,
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

  async changePassword(user: UserDto, oldPassword: string, newPassword: string) {
    if (oldPassword === newPassword) {
      throw new BadRequestException(ErrorResponseCode.NewPasswordMatchesOldPassword);
    }

    const passwordsMatch = await this.verifyPassword(oldPassword, user.password);
    if (!passwordsMatch) {
      throw new BadRequestException(ErrorResponseCode.IncorrectPassword);
    }

    const hashedPassword = await this.hashingService.hash(newPassword);
    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
    });
  }
}
