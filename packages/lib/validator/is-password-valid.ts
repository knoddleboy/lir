import type { PasswordValidStates } from "./types";

export function isPasswordValid(password: string) {
  let /** Has minimum 8 characters */
    min = false,
    /** Has at least one uppercase letter */
    upp = false,
    /** Has at least one lowercase letter */
    low = false,
    /** Has at leas one number */
    num = false;

  if (password.length > 7) min = true;
  if (password.match(/[A-Z]/)) upp = true;
  if (password.match(/[a-z]/)) low = true;
  if (password.match(/\d/)) num = true;

  const errors: Record<keyof typeof PasswordValidStates, boolean> = {
    upplow: upp && low,
    min,
    num,
  };

  return errors;
}
