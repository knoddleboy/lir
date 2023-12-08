import { z } from "zod";

import { idSchema } from "../shared/id";

export const jwtPayloadSchema = z.object({
  sub: idSchema,
  email: z.string().email(),
});
