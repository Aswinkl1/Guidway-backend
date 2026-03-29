export const TYPES = {
	// cache
	CacheService: Symbol.for("CacheService"),

	//repository
	UserRepository: Symbol.for("UserRepository"),
	TokenRepository: Symbol.for("TokenRepository"),
	PrismaTokenRepository: Symbol.for("PrismaTokenRepository"),
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
	GetUserUsecase: Symbol.for("GetUserUsecase"),
	UpdateBlockStatus: Symbol.for("UpdateBlockStatus"),
	//controller
	AuthController: Symbol.for("AuthController"),
	UserManagementController: Symbol.for("UserManagementController"),
	AdminLoginUseCase: Symbol.for("AdminLoginUseCase"),
	// Infrastructure Clients
	PrismaClient: Symbol.for("PrismaClient"),
	RedisClient: Symbol.for("RedisClient"),
} as const;
