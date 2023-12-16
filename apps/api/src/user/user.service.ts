import { ErrorResponseCode } from "@lir/lib/error";
import { UpdateUserInput, UserProps } from "@lir/lib/schema";

import { Prisma, User } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";

import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";

import { AvatarService } from "~/avatar/avatar.service";
import { HashingService } from "~/lib/services/hashing.service";
import { MailService } from "~/mail/mail.service";

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashingService: HashingService,
    private readonly avatarService: AvatarService,
    private readonly mailService: MailService
  ) {}

  async getUserInfo(id: string): Promise<UserProps> {
    return await this.prismaService.user.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        avatar: true,
        identityProvider: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateUser(user: User, input: UpdateUserInput): Promise<UserProps> {
    const data: Prisma.UserUpdateInput = { ...input };

    const emailChanged = input.email && input.email !== user.email;
    if (emailChanged) {
      data.emailVerified = null;
      this.mailService.sendEmailVerification(input.name || user.name, input.email!);
    }

    if (input.avatar && input.avatar.startsWith("data:image/png;base64,")) {
      data.avatar = await this.avatarService.uploadAvatar(user.id, input.avatar);
    }

    // When a user deletes their avatar, we expect to receive null from the client,
    // which then gets transformed by zod schema to an empty string
    if (input.avatar === "") {
      data.avatar = null;
    }

    const updatedUser: UserProps = await this.prismaService.user.update({
      where: { id: user.id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        avatar: true,
        identityProvider: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // TODO: when identity provider changes from social we want to send a
    // password reset email so that the user can log in with their new email

    return { ...input, ...updatedUser };
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
      throw new BadRequestException(ErrorResponseCode.InvalidCredentials);
    }

    await this._deleteUser(id);
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

    await this._deleteUser(id);
  }

  private async _deleteUser(userId: string) {
    await Promise.all([
      this.prismaService.user.delete({
        where: { id: userId },
      }),
      this.avatarService.deleteAvatar(userId),
    ]);
  }
}
