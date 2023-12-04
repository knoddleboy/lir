import { z } from "nestjs-zod/z";

export const passwordSchema = z
  .password()
  .min(8)
  .atLeastOne("digit")
  .atLeastOne("special")
  .atLeastOne("lowercase")
  .atLeastOne("uppercase");
