import { Response } from "express";

import { Controller, Get, Param, Res } from "@nestjs/common";

import { AvatarService } from "./avatar.service";

@Controller("avatar")
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Get(":avatarId")
  async get(@Param("avatarId") avatarId: string, @Res() response: Response) {
    return this.avatarService.getAvatar(avatarId, response);
  }
}
