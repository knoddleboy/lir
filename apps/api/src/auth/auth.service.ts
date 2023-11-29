import { ErrorResponseCode } from "@lir/lib/error";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";

import { LoginDto } from "~/dto/auth/login";
import { SignupDto } from "~/dto/auth/signup";
import { UserService } from "~/user/user.service";

import { PasswordService } from "./password/password.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService
  ) {}

  async register(signupDto: SignupDto) {
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

  async logout() {}

  private validatePassword(password: string, hashedPassword: string): void {
    const isValid = this.passwordService.validate(password, hashedPassword);

    if (!isValid) {
      throw new BadRequestException(ErrorResponseCode.InvalidCredentials);
    }
  }
}
