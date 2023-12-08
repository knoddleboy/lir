export const PasswordValidStates = {
  /** Has minimum 8 characters */
  min: "pw_min",
  /** Has at leas one number */
  num: "pw_num",
  /** Has at least one uppercase & lowercase letter */
  upplow: "pw_upplow",
} as const;
