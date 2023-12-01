import { Prisma } from "@prisma/client";

export type UserWithTokens = Prisma.UserGetPayload<{
  include: { tokens: true };
}>;
