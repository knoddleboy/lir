export enum ErrorResponseCode {
  InvalidCredentials = "invalid-credentials",
  UserNotFound = "user-not-found",
  UserAlreadyExists = "user-already-exists",
  InvalidRefreshToken = "invalid-refresh-token",
  InvalidVerificationToken = "invalid-verification-token",
  ExpiredVerificationToken = "expired-verification-token",
  NotImplemented = "not-implemented",
  SocialIdentityProviderRequired = "social-identity-provider-required",
  NewPasswordMatchesOldPassword = "new-password-matches-old-password",
  IncorrectPassword = "incorrect-password",
}
