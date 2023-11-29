import { Request } from "express";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";

import { Config } from "~/config/schema";
import { UserService } from "~/user/user.service";

import { JwtPayload } from "../utils/type";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly userService: UserService
  ) {
    super({
      secretOrKey: configService.get<string>("JWT_ACCESS_SECRET"),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.Authorization,
      ]),
      ignoreExpiration: false,
    } as StrategyOptions);
  }

  async validate(payload: JwtPayload) {
    // return this.userService.findOneById(payload.sub);
    return payload;
  }
}
