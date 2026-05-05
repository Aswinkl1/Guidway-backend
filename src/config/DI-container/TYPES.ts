export const TYPES = {
	// cache
	CacheService: Symbol.for("CacheService"),

	//repository
	UserRepository: Symbol.for("UserRepository"),
	TokenRepository: Symbol.for("TokenRepository"),
	PrismaTokenRepository: Symbol.for("PrismaTokenRepository"),
	MentorRepository: Symbol.for("MentorRepository"),
	EducationRepository: Symbol.for("EducationRepository"),
	ExperienceRepository: Symbol.for("ExperienceRepository"),
	AchievementRepository: Symbol.for("AchievementRepository"),
	//services
	EmailService: Symbol.for("EmailService"),
	HashService: Symbol.for("HashService"),
	TokenService: Symbol.for("TokenService"),
	S3Service: Symbol.for("S3Service"),

	// usecases
	ForgetPasswordUseCase: Symbol.for("ForgetPasswordUseCase"),
	LoginUseCase: Symbol.for("LoginUseCase"),
	RefreshTokenUseCase: Symbol.for("RefreshTokenUseCase"),
	ResetPasswordUseCase: Symbol.for("ResetPasswordUseCase"),
	SignUpUseCase: Symbol.for("SignUpUseCase"),
	VerifyEmailUseCase: Symbol.for("VerifyEmailUseCase"),
	GetUserUsecase: Symbol.for("GetUserUsecase"),
	UpdateBlockStatus: Symbol.for("UpdateBlockStatus"),
	UserUploadUrlUsecase: Symbol.for("UserUploadUrlUsecase"),
	OAuthUseCase: Symbol.for("OAuthUseCase"),
	PassPortConfig: Symbol.for("PassPortConfig"),
	VerifyMentorUsecase: Symbol.for("VerifyMentorUsecase"),
	AddEducationUsecase: Symbol.for("AddEducationUsecase"),
	EditEducationUsecase: Symbol.for("EditEducationUsecase"),
	DeleteEducationUsecase: Symbol.for("DeleteEducationUsecase"),
	AddExperienceUsecase: Symbol.for("AddExperienceUsecase"),
	EditExperienceUsecase: Symbol.for("EditExperienceUsecase"),
	DeleteExperienceUsecase: Symbol.for("DeleteExperienceUsecase"),
	AddAchievementUsecase: Symbol.for("AddAchievementUsecase"),
	//controller
	AuthController: Symbol.for("AuthController"),
	UserManagementController: Symbol.for("UserManagementController"),
	AdminLoginUseCase: Symbol.for("AdminLoginUseCase"),
	ProfileMentorController: Symbol.for("ProfileMentorController"),
	// Infrastructure Clients
	PrismaClient: Symbol.for("PrismaClient"),
	RedisClient: Symbol.for("RedisClient"),
} as const;
