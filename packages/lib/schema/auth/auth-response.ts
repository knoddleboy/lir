import { z } from "zod";

import { idSchema } from "../shared/id";

export const authResponseSchema = z.object({
  id: idSchema,
  email: z.string().email(),
});
