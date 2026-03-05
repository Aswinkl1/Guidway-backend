export const TYPES = {
  //repository
  UserRepository: Symbol.for("UserRepository"),
  TokenRepository: Symbol.for("TokenRepository"),

  //services
  EmailService: Symbol.for("EmailService"),
  HashService: Symbol.for("HashService"),
  TokenService: Symbol.for("TokenService"),

  // usecases
  ForgetPasswordUseCase: Symbol.for("ForgetPasswordUseCase"),
  LoginUseCase: Symbol.for("LoginUseCase"),
  RefreshTokenUseCase: Symbol.for("RefreshTokenUseCase"),
  ResetPasswordUseCase: Symbol.for("ResetPasswordUseCase"),
  SignUpUseCase: Symbol.for("SignUpUseCase"),
  VerifyEmailUseCase: Symbol.for("VerifyEmailUseCase"),

  //controller
  AuthController: Symbol.for("AuthController"),

  // Infrastructure Clients
  PrismaClient: Symbol.for("PrismaClient"),
  RedisClient: Symbol.for("RedisClient"),
} as const;
