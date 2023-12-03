import { Request } from "express";
import { PrismaService } from "nestjs-prisma";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";

import { Config } from "~/config/schema";

import { JwtPayload } from "../utils/type";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly prismaService: PrismaService
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
    return this.prismaService.user.findUniqueOrThrow({
      where: { id: payload.sub },
    });
  }
}
