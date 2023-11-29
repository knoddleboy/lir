import { Request } from "express";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";

import { AuthService } from "~/auth/auth.service";
import { Config } from "~/config/schema";

import { JwtPayload } from "../utils/type";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly authService: AuthService
  ) {
    super({
      secretOrKey: configService.get<string>("JWT_REFRESH_SECRET"),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.Refresh,
      ]),
      passReqToCallback: true,
      ignoreExpiration: false,
    } as StrategyOptions);
  }

  async validate(request: Request, payload: JwtPayload) {
    const refreshToken = request.cookies?.Refresh;
    return this.authService.validateRefreshToken(refreshToken, payload);
  }
}
