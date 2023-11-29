import { jwtPayloadSchema } from "@lir/lib/schema";

import { z } from "nestjs-zod/z";

export type JwtPayload = z.infer<typeof jwtPayloadSchema>;
