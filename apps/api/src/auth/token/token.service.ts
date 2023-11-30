import { ErrorResponseCode } from "@lir/lib/error";
import { jwtPayloadSchema } from "@lir/lib/schema";

import { Prisma } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";

import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import { Config } from "~/config/schema";
import { UserService } from "~/user/user.service";

import { PasswordService } from "../password/password.service";
import { JwtPayload } from "../utils/type";

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<Config>,
    private readonly passwordService: PasswordService,
    private readonly userService: UserService,
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

  async validateRefreshToken(token: string, payload: JwtPayload) {
    const user = await this.userService.findOneById(payload.sub);
    const isValid = await this.passwordService.validate(
      token,
      user?.tokens?.refreshToken || ""
    );

    if (!isValid) {
      throw new UnauthorizedException(ErrorResponseCode.InvalidRefreshToken);
    }

    return user;
  }

  async refreshTokens(id: string, email: string) {
    const payload = jwtPayloadSchema.parse({ sub: id, email });

    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken("access", payload),
      this.generateToken("refresh", payload),
    ]);

    const hashedRefreshToken = await this.passwordService.hash(refreshToken);
    const { exp } = this.jwtService.decode(refreshToken);

    const tokenData = {
      refreshToken: hashedRefreshToken,
      expiresAt: new Date(exp * 1000), // epoch ms
    };

    await this.createOrUpdateToken(id, tokenData);

    return { accessToken, refreshToken };
  }

  async createOrUpdateToken(
    userId: string,
    data: Omit<Prisma.TokenCreateInput, "user">
  ) {
    await this.prismaService.token.upsert({
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

  async deleteToken(userId: string) {
    await this.prismaService.token.delete({
      where: { userId },
    });
  }
}
