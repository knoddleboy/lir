import { ErrorResponseCode } from "@lir/lib/error";

import { Prisma } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { UserDto } from "~/lib/dto/user";
import { HashingService } from "~/lib/services/hashing.service";

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashingService: HashingService
  ) {}

  async getUserInfo(id: string) {
    return await this.prismaService.user.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        identityProvider: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateUserProfile(user: UserDto, input: Prisma.UserUpdateInput) {
    const data: Prisma.UserUpdateInput = { ...input };

    const emailChanged = data.email && data.email !== user.email;
    if (emailChanged) {
      data.emailVerified = null;
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data,
    });

    // TODO: when identity provider changes we want to send en email with
    // password reset so that the user can log in with their new email

    return { ...input };
  }

  async deleteUser(id: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(ErrorResponseCode.UserNotFound);
    }

    const passwordsMatch = await this.hashingService.validate(
      password,
      user.password
    );
    if (!passwordsMatch) {
      throw new ForbiddenException(ErrorResponseCode.InvalidCredentials);
    }

    return await this.prismaService.user.delete({
      where: { id },
    });
  }

  async deleteUserWithoutPassword(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        identityProvider: true,
      },
    });

    if (!user) {
      throw new NotFoundException(ErrorResponseCode.UserNotFound);
    }

    if (user.identityProvider === "EMAIL") {
      throw new BadRequestException(
        ErrorResponseCode.SocialIdentityProviderRequired
      );
    }

    await this.prismaService.user.delete({
      where: { id },
    });

    return;
  }
}
