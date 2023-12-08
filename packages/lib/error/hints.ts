import type { PasswordValidStates } from "../validator";

export const passwordHints: Record<keyof typeof PasswordValidStates, string> = {
  min: "At least 8 characters long",
  num: "Contain at least 1 number",
  upplow: "Mix of lowercase & uppercase letters",
};
