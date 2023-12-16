import { randomBytes } from "crypto";
import dayjs from "dayjs";
import { PrismaService } from "nestjs-prisma";

import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";

import { MailBaseService } from "./mail-base.service";

@Injectable()
export class MailService {
  constructor(
    private readonly mailBaseService: MailBaseService,
    private readonly prismaService: PrismaService
  ) {}

  async sendEmailVerification(name: string, email: string) {
    try {
      const token = randomBytes(32).toString("hex");
      const params = new URLSearchParams({ token });

      await this.prismaService.verificationToken.create({
        data: {
          identifier: email,
          token,
          expiresAt: dayjs().add(1, "day").toDate(),
        },
      });

      await this.mailBaseService.sendMail({
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
