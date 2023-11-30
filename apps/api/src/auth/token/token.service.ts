import { jwtPayloadSchema } from "@lir/lib/schema";

import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import { Config } from "~/config/schema";
import { UserService } from "~/user/user.service";

import { JwtPayload } from "../utils/type";

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<Config>,
    private readonly userService: UserService
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
        throw new InternalServerErrorException();
    }
  }

  async validateRefreshToken(token: string, payload: JwtPayload) {
    const user = this.userService.findOneById(payload.sub);

    // access user's tokens and if any compare with the provided token

    return user;
  }

  async refreshTokens(id: string, email: string) {
    const payload = jwtPayloadSchema.parse({ sub: id, email });

    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken("access", payload),
      this.generateToken("refresh", payload),
    ]);

    // store refresh token

    return { accessToken, refreshToken };
  }
}
