import "reflect-metadata";
import type { ICacheService } from "@application/ports/cache/ICache";
import type { ITokenCache } from "@application/ports/cache/ITokenCache";
import type { IMentorRepository } from "@application/ports/repository/IMentorRepository";
import type { IPrismaRepository } from "@application/ports/repository/IPrismaTokenRepository";
// Types
import type { IUserRepository } from "@application/ports/repository/IUserRepository";
import type { IEmailService } from "@application/ports/services/IEmailService";
import type { IHashService } from "@application/ports/services/IHashService";
import type { IS3Service } from "@application/ports/services/IS3Service";
import type { ITokenService } from "@application/ports/services/ITokenService";
import type { IAdminLoginUsecase } from "@application/ports/usecase/admin/IAdminLogin.usecase";
import type { IGetUsersUsecase } from "@application/ports/usecase/admin/IGetUsers.usecase";
import type { IUpdateBlockStatus } from "@application/ports/usecase/admin/IUpdateBlockStatus";
import type { IForgetPasswordUsecase } from "@application/ports/usecase/IForgetPassword.usercase";
import type { ILoginUsecase } from "@application/ports/usecase/ILogin.usecase";
import type { IOAuthUseCase } from "@application/ports/usecase/IOAuth.usecase";
import type { IRefreshTokenUsecase } from "@application/ports/usecase/IRefreshToken.usecase";
import type { IResetPassswordUsecase } from "@application/ports/usecase/IResetPassword.usecase";
import type { ISignUpUsecase } from "@application/ports/usecase/ISignUpUsecase";
import type { IUserUploadUrlUsecase } from "@application/ports/usecase/IUserUploadUrl.usecase";
import type { IVerifyEmailUsecase } from "@application/ports/usecase/IVerifyEmail.usecase";
import { AdminLoginUsecase } from "@application/useCases/admin/adminLogin.usecase";
import { GetUsersUsecase } from "@application/useCases/admin/GetUsers.usecase";
import { UpdateBlockStatus } from "@application/useCases/admin/updateBlockStatus.usecase";
import { ForgetPasswordUsecase } from "@application/useCases/user/forgetPassword.usecase";
import { LoginUsecase } from "@application/useCases/user/loginUser.usercase";
import { OAuthUseCase } from "@application/useCases/user/OAuth.usecase";
import { RefreshTokenUsecase } from "@application/useCases/user/refreshToken.usecase";
import { ResetPasswordUsecase } from "@application/useCases/user/resetPassword.usecase";
import { SignUpUser } from "@application/useCases/user/SignUp.usecase";
import { UserUploadUrlUsecase } from "@application/useCases/user/UserUploadUrlUsecase";
import { VerifyEmailUseCase } from "@application/useCases/user/verifyEmail.usecase";
import { CacheService } from "@infrastructure/cache/Cache";
import { TokenCache } from "@infrastructure/cache/TokenCache";
import { prisma } from "@infrastructure/database/prisma";
import {
	type AppRedisClientType,
	redisClient,
} from "@infrastructure/database/redisClient";
import MentorRepository from "@infrastructure/repositories/mentor.repository";
import { PrismaTokenRespository } from "@infrastructure/repositories/PrismaTokenRepository";
//
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { ArgonPasswordHasher } from "@infrastructure/services/ArgonHashService";
import { NodemailerEmailService } from "@infrastructure/services/NodemailerEmailService";
import { PassportConfig } from "@infrastructure/services/PassportService";
import { S3Service } from "@infrastructure/services/S3Service";
import { TokenService } from "@infrastructure/services/TokenServices";
import { UserManagementController } from "@presentation/controllers/admin/UserManagement.controller";
import { AuthController } from "@presentation/controllers/auth.controller";
import type { IAuthController } from "@presentation/interface/controllers/IAuthController";
import type { IUserManagementController } from "@presentation/interface/controllers/IUserManagement.controller";
import type { PrismaClient } from "generated/prisma/client";
import { Container } from "inversify";
import { TYPES } from "./TYPES";

console.log("container ");

const container = new Container();

//cache

container
	.bind<ICacheService>(TYPES.CacheService)
	.to(CacheService)
	.inSingletonScope();

//Repository

container
	.bind<IUserRepository>(TYPES.UserRepository)
	.to(UserRepository)
	.inSingletonScope();

container
	.bind<ITokenCache>(TYPES.TokenRepository)
	.to(TokenCache)
	.inSingletonScope();

container
	.bind<IPrismaRepository>(TYPES.PrismaTokenRepository)
	.to(PrismaTokenRespository)
	.inSingletonScope();

container
	.bind<IMentorRepository>(TYPES.MentorRepository)
	.to(MentorRepository)
	.inSingletonScope();
//usecase

container
	.bind<IForgetPasswordUsecase>(TYPES.ForgetPasswordUseCase)
	.to(ForgetPasswordUsecase)
	.inSingletonScope();

container
	.bind<ILoginUsecase>(TYPES.LoginUseCase)
	.to(LoginUsecase)
	.inSingletonScope();

container
	.bind<IRefreshTokenUsecase>(TYPES.RefreshTokenUseCase)
	.to(RefreshTokenUsecase)
	.inSingletonScope();

container
	.bind<IResetPassswordUsecase>(TYPES.ResetPasswordUseCase)
	.to(ResetPasswordUsecase)
	.inSingletonScope();

container
	.bind<ISignUpUsecase>(TYPES.SignUpUseCase)
	.to(SignUpUser)
	.inSingletonScope();

container
	.bind<IVerifyEmailUsecase>(TYPES.VerifyEmailUseCase)
	.to(VerifyEmailUseCase)
	.inSingletonScope();

container
	.bind<IGetUsersUsecase>(TYPES.GetUserUsecase)
	.to(GetUsersUsecase)
	.inSingletonScope();

container
	.bind<IAdminLoginUsecase>(TYPES.AdminLoginUseCase)
	.to(AdminLoginUsecase)
	.inSingletonScope();

container
	.bind<IUpdateBlockStatus>(TYPES.UpdateBlockStatus)
	.to(UpdateBlockStatus)
	.inSingletonScope();

container
	.bind<IUserUploadUrlUsecase>(TYPES.UserUploadUrlUsecase)
	.to(UserUploadUrlUsecase)
	.inSingletonScope();

container
	.bind<IOAuthUseCase>(TYPES.OAuthUseCase)
	.to(OAuthUseCase)
	.inSingletonScope();

// services
container
	.bind<IEmailService>(TYPES.EmailService)
	.to(NodemailerEmailService)
	.inSingletonScope();
container
	.bind<IHashService>(TYPES.HashService)
	.to(ArgonPasswordHasher)
	.inSingletonScope();
container
	.bind<ITokenService>(TYPES.TokenService)
	.to(TokenService)
	.inSingletonScope();
container.bind<IS3Service>(TYPES.S3Service).to(S3Service).inSingletonScope();
container
	.bind<PassportConfig>(TYPES.PassPortConfig)
	.to(PassportConfig)
	.inSingletonScope();
//controller
container
	.bind<IAuthController>(TYPES.AuthController)
	.to(AuthController)
	.inSingletonScope();
container
	.bind<IUserManagementController>(TYPES.UserManagementController)
	.to(UserManagementController)
	.inSingletonScope();

// db client
container.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(prisma);
container
	.bind<AppRedisClientType>(TYPES.RedisClient)
	.toConstantValue(redisClient);

export { container };
