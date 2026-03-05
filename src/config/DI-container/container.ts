import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./TYPES";

// Types
import type { IUserRepository } from "@application/ports/repository/IUserRepository";
import type { ITokenRepository } from "@application/ports/repository/ITokenRepository";
import type { IEmailService } from "@application/ports/services/IEmailService";
import type { IHashService } from "@application/ports/services/IHashService";
import type { ITokenService } from "@application/ports/services/ITokenService";
import type { IForgetPasswordUsecase } from "@application/ports/usecase/IForgetPassword.usercase";
import type { ILoginUsecase } from "@application/ports/usecase/ILogin.usecase";
import type { IRefreshTokenUsecase } from "@application/ports/usecase/IRefreshToken.usecase";
import type { IResetPassswordUsecase } from "@application/ports/usecase/IResetPassword.usecase";
import type { ISignUpUsecase } from "@application/ports/usecase/ISignUpUsecase";
import type { IVerifyEmailUsecase } from "@application/ports/usecase/IVerifyEmail.usecase";
import type { IAuthController } from "@presentation/interface/controllers/IAuthController";

//
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { TokenRepository } from "@infrastructure/repositories/TokenRepository";
import { NodemailerEmailService } from "@infrastructure/services/NodemailerEmailService";
import { ArgonPasswordHasher } from "@infrastructure/services/ArgonHashService";
import { TokenService } from "@infrastructure/services/TokenServices";
import { ForgetPasswordUsecase } from "@application/useCases/user/forgetPassword.usecase";
import { LoginUsecase } from "@application/useCases/user/loginUser.usercase";
import { RefreshTokenUsecase } from "@application/useCases/user/refreshToken.usecase";
import { ResetPasswordUsecase } from "@application/useCases/user/resetPassword.usecase";
import { SignUpUser } from "@application/useCases/user/SignUp.usecase";
import { VerifyEmailUseCase } from "@application/useCases/user/verifyEmail.usecase";
import { AuthController } from "@presentation/controllers/auth.controller";

import { prisma } from "@infrastructure/database/prisma";
import { PrismaClient } from "generated/prisma/client";
import {
  AppRedisClientType,
  redisClient,
} from "@infrastructure/database/redisClient";
console.log("container ");
//Repository
const container = new Container();
container
  .bind<IUserRepository>(TYPES.UserRepository)
  .to(UserRepository)
  .inSingletonScope();

container
  .bind<ITokenRepository>(TYPES.TokenRepository)
  .to(TokenRepository)
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

//controller
container
  .bind<IAuthController>(TYPES.AuthController)
  .to(AuthController)
  .inSingletonScope();

// db client
container.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(prisma);
container
  .bind<AppRedisClientType>(TYPES.RedisClient)
  .toConstantValue(redisClient);
export { container };
