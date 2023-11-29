import { CookieOptions } from "express";

import { InternalServerErrorException } from "@nestjs/common";

export const cookieOptionsFactory = (
  grantType: "access" | "refresh"
): CookieOptions => {
  const options = {
    httpOnly: true,
    sameSite: true,
    secure: process.env.NODE_ENV === "production",
  } as CookieOptions;

  switch (grantType) {
    case "access": {
      options.expires = new Date(Date.now() + 1000 * 60 * 15); // 15m
      break;
    }

    case "refresh": {
      options.expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7d
      break;
    }

    default:
      throw new InternalServerErrorException();
  }

  return options;
};
