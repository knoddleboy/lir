import { ErrorResponseCode } from "@lir/lib/error";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import { Config } from "~/config/schema";
import { LoginDto } from "~/dto/auth/login";
import { SignupDto } from "~/dto/auth/signup";
import { UserService } from "~/user/user.service";

import { PasswordService } from "./password/password.service";
import { JwtPayload } from "./utils/type";

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService
  ) {}

  async signup(signupDto: SignupDto) {
    const hashedPassword = await this.passwordService.hash(signupDto.password);

    try {
      const user = await this.userService.create({
        name: signupDto.name,
        email: signupDto.email,
        password: hashedPassword,
      });

      // call to mail service

      return user;
    } catch (error) {
      if (
        // https://www.prisma.io/docs/reference/api-reference/error-reference#p2002
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new BadRequestException(ErrorResponseCode.UserAlreadyExists);
      }

      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.userService.findOneByIdentifier({
        email: loginDto.email,
      });

      this.validatePassword(loginDto.password, user.password);

      return user;
    } catch (error) {
      throw new BadRequestException(ErrorResponseCode.InvalidCredentials);
    }
  }

  async logout() {
    throw new Error("Unimplemented");
  }

  async validateRefreshToken(token: string, payload: JwtPayload) {
    const user = this.userService.findOneById(payload.sub);

    // access user's tokens and if any compare with the provided token

    return user;
  }

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

  private async validatePassword(password: string, hashedPassword: string) {
    const isValid = await this.passwordService.validate(
      password,
      hashedPassword
    );

    if (!isValid) {
      throw new BadRequestException(ErrorResponseCode.InvalidCredentials);
    }
  }
}
