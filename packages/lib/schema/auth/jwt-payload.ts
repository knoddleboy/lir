import { z } from "zod";

import { idSchema } from "../shared";

export const jwtPayloadSchema = z.object({
  sub: idSchema,
  email: z.string().email(),
});
