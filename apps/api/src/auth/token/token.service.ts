import { ErrorResponseCode } from "@lir/lib/error";
import { jwtPayloadSchema } from "@lir/lib/schema";
import { Prisma, User } from "@lir/prisma";

import { PrismaService } from "nestjs-prisma";

import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import { Config } from "~/config/schema";
import { HashingService } from "~/lib/services/hashing.service";

import { JwtPayload } from "../utils/type";

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<Config>,
    private readonly hashingService: HashingService,
    private readonly prismaService: PrismaService
  ) {}

  async generateToken(grantType: "access" | "refresh", payload: JwtPayload) {
    switch (grantType) {
      case "access": {
        return await this.jwtService.signAsync(payload, {
          secret: this.configService.get<string>("JWT_ACCESS_SECRET"),
          expiresIn: "15m",
        });
      }

      case "refresh": {
        return await this.jwtService.signAsync(payload, {
          secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
          expiresIn: "7d",
        });
      }

      default:
        throw new InternalServerErrorException(/** Invalid `grantType` */);
    }
  }

  async validateRefreshToken(token: string, payload: JwtPayload): Promise<User> {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { id: payload.sub },
      include: {
        accounts: {
          where: { userId: payload.sub },
        },
      },
    });
    const isValid = await this.hashingService.validate(
      token,
      user?.accounts?.refreshToken || ""
    );

    if (!isValid) {
      throw new UnauthorizedException(ErrorResponseCode.InvalidRefreshToken);
    }

    return user;
  }

  async refreshTokens(userId: string, email: string) {
    const payload = jwtPayloadSchema.parse({ sub: userId, email });

    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken("access", payload),
      this.generateToken("refresh", payload),
    ]);

    const hashedRefreshToken = await this.hashingService.hash(refreshToken);

    const tokenData = {
      refreshToken: hashedRefreshToken,
    };

    await this.setRefreshToken(userId, tokenData);

    return { accessToken, refreshToken };
  }

  async setRefreshToken(
    userId: string,
    data: Prisma.AccountUpsertWithoutUserInput["create"]
  ) {
    await this.prismaService.account.upsert({
      where: { userId },
      create: {
        ...data,
        user: { connect: { id: userId } },
      },
      update: {
        ...data,
      },
    });
  }

  async deleteRefreshToken(userId: string) {
    await this.prismaService.account.delete({
      where: { userId },
    });
  }
}
