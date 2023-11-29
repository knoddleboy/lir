import { compare, genSalt, hash } from "bcrypt";

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PasswordService {
  constructor(private readonly configService: ConfigService) {}

  private async genSaltRounds(): Promise<number> {
    const saltOrRounds = this.configService.get<number>(
      "BCRYPT_SALT_OR_ROUNDS"
    );

    if (saltOrRounds !== undefined) {
      return saltOrRounds;
    }

    return +(await genSalt());
  }

  async hash(password: string): Promise<string> {
    const saltOrRounds = await this.genSaltRounds();
    return await hash(password, saltOrRounds);
  }

  async validate(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}
