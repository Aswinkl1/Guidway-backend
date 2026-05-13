import "reflect-metadata";
import type { ICacheService } from "@application/ports/cache/ICache";
import type { ITokenCache } from "@application/ports/cache/ITokenCache";
import type { IMentorQuery } from "@application/ports/queries/IMentor.query";
import type { IAchievementRepository } from "@application/ports/repository/IAcheivement.repository";
import type { IDomainRepository } from "@application/ports/repository/IDomain.repository";
import type { IEducationRepository } from "@application/ports/repository/IEducation.repository";
import type { IExperienceRepository } from "@application/ports/repository/IExperience.repository";
import type { ILanguageRepository } from "@application/ports/repository/ILanguage.repository";
import type { IMentorBookingRulesRepository } from "@application/ports/repository/IMentorBookingRules.repositoty";
import type { IMentorLanguageRepository } from "@application/ports/repository/IMentorLanguage.repository";
import type { IMentorRepository } from "@application/ports/repository/IMentorRepository";
import type { IMentorSkillRepository } from "@application/ports/repository/IMentorSkill.repository";
import type { IPrismaRepository } from "@application/ports/repository/IPrismaTokenRepository";
import type { ISessionRepository } from "@application/ports/repository/ISession.respository";
import type { ISkillRepository } from "@application/ports/repository/ISkill.repository";
import type { ISocialLinkRepository } from "@application/ports/repository/ISocialLinks.reposiroty";
// Types
import type { IUserRepository } from "@application/ports/repository/IUserRepository";
import type { IEmailService } from "@application/ports/services/IEmailService";
import type { IHashService } from "@application/ports/services/IHashService";
import type { IS3Service } from "@application/ports/services/IS3Service";
import type { ITokenService } from "@application/ports/services/ITokenService";
import type { IAdminLoginUsecase } from "@application/ports/usecase/admin/IAdminLogin.usecase";
import type { IGetUsersUsecase } from "@application/ports/usecase/admin/IGetUsers.usecase";
import type { IUpdateBlockStatus } from "@application/ports/usecase/admin/IUpdateBlockStatus";
import type IVerifyMentorUsecase from "@application/ports/usecase/admin/IVerifyMentor.usecase";
import type { IEditUserProfileUsecase } from "@application/ports/usecase/IEditUserProfile.usecase";
import type { IForgetPasswordUsecase } from "@application/ports/usecase/IForgetPassword.usercase";
import type { ILoginUsecase } from "@application/ports/usecase/ILogin.usecase";
import type { IOAuthUseCase } from "@application/ports/usecase/IOAuth.usecase";
import type { IRefreshTokenUsecase } from "@application/ports/usecase/IRefreshToken.usecase";
import type { IResetPassswordUsecase } from "@application/ports/usecase/IResetPassword.usecase";
import type { ISignUpUsecase } from "@application/ports/usecase/ISignUpUsecase";
import type { IUserUploadUrlUsecase } from "@application/ports/usecase/IUserUploadUrl.usecase";
import type { IVerifyEmailUsecase } from "@application/ports/usecase/IVerifyEmail.usecase";
import type { IAddAchievementUsecase } from "@application/ports/usecase/mentor/achievements/IAdd-Achievement.usecase";
import type { IGetDomainUsecase } from "@application/ports/usecase/mentor/Domian/IGetDomain.usecase";
import type { IAddEducationUsecase } from "@application/ports/usecase/mentor/education/IAdd-Education.usecase";
import type { IDeleteEducationUsecase } from "@application/ports/usecase/mentor/education/IDelete-Education.usecase";
import type { IEditEducationUsecase } from "@application/ports/usecase/mentor/education/IEdit-Education.usecase";
import type { IAddExperienceUsecase } from "@application/ports/usecase/mentor/experience/IAdd-Experience.usecase";
import type { IDeleteExperienceUsecase } from "@application/ports/usecase/mentor/experience/IDelete-Experience.usecase";
import type { IEditExperienceUsecase } from "@application/ports/usecase/mentor/experience/IEdit-Experience.usecase";
import type { IChangePasswordUsecase } from "@application/ports/usecase/mentor/IChangePassword.usecase";
import type { ICreateSocaiLinksUsecase } from "@application/ports/usecase/mentor/ICreateSocailLinks.usecase";
import type { IGetMentorProfileUsecase } from "@application/ports/usecase/mentor/IGetMentorProfile.usecase";
import type { IMentorStatusUpdateUsecase } from "@application/ports/usecase/mentor/IMentorStatusUpdate.usecase";
import type { IUpdateMentorBookingRulesUsecase } from "@application/ports/usecase/mentor/IUpdateMentorBookingRules.usecase";
import type { IUpdateMentorOverviewUsecase } from "@application/ports/usecase/mentor/IUpdateMentorOverview.usecase";
import type { IAddMentorLanguageUsecase } from "@application/ports/usecase/mentor/language/IAddMentorLanguage.usecase";
import type { IDeleteMentorLanguageUsecase } from "@application/ports/usecase/mentor/language/IDeleteMentorLanguage.usecase";
import type { IGetLanguagesUsecase } from "@application/ports/usecase/mentor/language/IGetLanguage.usecase";
import type { IAddSessionUsecase } from "@application/ports/usecase/mentor/session/IAddSession.usecase";
import type { IDeleteSessionUsecase } from "@application/ports/usecase/mentor/session/IDeleteSession.usecase";
import type { IEditSessionUsecase } from "@application/ports/usecase/mentor/session/IEditSession.usecase";
import type { IAddMentorSkillUsecase } from "@application/ports/usecase/mentor/skills/IAddMentorSkill.usecase";
import type { IDeleteMentorSkillUsecase } from "@application/ports/usecase/mentor/skills/IDeleteMentorSkill.usecase";
import type { IGetSkillsUsecase } from "@application/ports/usecase/mentor/skills/IGetSkills.usecase";
import { AdminLoginUsecase } from "@application/useCases/admin/adminLogin.usecase";
import { GetUsersUsecase } from "@application/useCases/admin/GetUsers.usecase";
import { UpdateBlockStatus } from "@application/useCases/admin/updateBlockStatus.usecase";
import VerifyMentorUsecase from "@application/useCases/admin/verifyMentor.usecase";
import { AddAchievementUsecase } from "@application/useCases/mentor/achievements/Add-Achievement.usecase";
import { CreateSocialLinksUsecse } from "@application/useCases/mentor/CreateSocialLink.usecase";
import { GetDomainUsecase } from "@application/useCases/mentor/domain/GetDomain.usecase";
import { AddEducationUsecase } from "@application/useCases/mentor/education/Add-Education.usecase";
import { DeleteEducationUsecase } from "@application/useCases/mentor/education/Delete-Education.usecase";
import EditEducationUsecase from "@application/useCases/mentor/education/Edit-Education.usecase";
import { AddExperienceUsecase } from "@application/useCases/mentor/experience/Add-Experience.usecase";
import { DeleteExperienceUsecase } from "@application/useCases/mentor/experience/Delete-Experience.usecase";
import { EditExperienceUsecase } from "@application/useCases/mentor/experience/Edit-Experience.usecase";
import { GetMentorProfileUsecase } from "@application/useCases/mentor/GetMentorProfile.usecase";
import { AddMentorLanguageUsecase } from "@application/useCases/mentor/language/AddMentorLanguage.usecase";
import { DeleteMentorLanguageUsecase } from "@application/useCases/mentor/language/DeleteMentorLanguage.usecase";
import { GetLanguageUsecase } from "@application/useCases/mentor/language/GetLanguage.usecase";
import { MentorStatusUpdateUsecase } from "@application/useCases/mentor/MentorStatusUpdate.usecase";
import { AddSessionUsecase } from "@application/useCases/mentor/session/AddSession.usecase";
import { DeleteSessionUsecase } from "@application/useCases/mentor/session/DeleteSession.usecase";
import { EditSessionUsecase } from "@application/useCases/mentor/session/EditSession.usecase";
import { AddMentorSkillUsecase } from "@application/useCases/mentor/skill/AddMentorSkill.usecase";
import { DeleteMentorSkillUsecase } from "@application/useCases/mentor/skill/DeleteMentorSkill.usecase";
import { GetSkillUsecase } from "@application/useCases/mentor/skill/GetSkill.usecase";
import { UpdateMentorBookingRulesUsecase } from "@application/useCases/mentor/UpdateMentorBookingRules.usecase";
import { UpdateMentorOverviewUsecase } from "@application/useCases/mentor/UpdateMentorOverviewUsecase";
import { ChangePasswordUsecase } from "@application/useCases/user/changePassword.usecase";
import { EditUserProfileUsecase } from "@application/useCases/user/EditUserProfile.usecase";
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
import { MentorQuery } from "@infrastructure/queries/mentor.query";
import AchievementRepository from "@infrastructure/repositories/Achievement.reository";
import { DomainRepository } from "@infrastructure/repositories/Domain.repoisitoty";
import EducationRepository from "@infrastructure/repositories/Education.repository";
import ExperienceRepository from "@infrastructure/repositories/Experience.repository";
import { LanguageRepository } from "@infrastructure/repositories/language.repository";
import { MentorBookingRulesRepository } from "@infrastructure/repositories/MentorBookingRules.repository";
import { MentorLanguageRepository } from "@infrastructure/repositories/MentorLanguage.repository";
import { MentorSkillRepository } from "@infrastructure/repositories/MentorSkill.repository";
import MentorRepository from "@infrastructure/repositories/mentor.repository";
import { PrismaTokenRespository } from "@infrastructure/repositories/PrismaTokenRepository";
import { SessionRepository } from "@infrastructure/repositories/Session.repository";
import { SkillRepository } from "@infrastructure/repositories/Skill.repository";
import { SocaiLinkRepository } from "@infrastructure/repositories/SocailLink.repository";
//
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { ArgonPasswordHasher } from "@infrastructure/services/ArgonHashService";
import { NodemailerEmailService } from "@infrastructure/services/NodemailerEmailService";
import { PassportConfig } from "@infrastructure/services/PassportService";
import { S3Service } from "@infrastructure/services/S3Service";
import { TokenService } from "@infrastructure/services/TokenServices";
import { UserManagementController } from "@presentation/controllers/admin/UserManagement.controller";
import { AuthController } from "@presentation/controllers/auth.controller";
import { ProfileController } from "@presentation/controllers/mentor/Profile.controller";
import { SessionController } from "@presentation/controllers/mentor/Session.controller";
import { SettingController } from "@presentation/controllers/mentor/Settings.controller";
import type { IAuthController } from "@presentation/interface/controllers/IAuthController";
import type { IProfileController } from "@presentation/interface/controllers/IProfileController";
import type { ISessionController } from "@presentation/interface/controllers/ISession.controller";
import type { ISettingsController } from "@presentation/interface/controllers/ISettings.controller";
import type { IUserManagementController } from "@presentation/interface/controllers/IUserManagement.controller";
import type { PrismaClient } from "generated/prisma/client";
import { Container } from "inversify";
import { TYPES } from "./TYPES";

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

container
	.bind<IEducationRepository>(TYPES.EducationRepository)
	.to(EducationRepository)
	.inSingletonScope();
container
	.bind<IExperienceRepository>(TYPES.ExperienceRepository)
	.to(ExperienceRepository)
	.inSingletonScope();

container
	.bind<IAchievementRepository>(TYPES.AchievementRepository)
	.to(AchievementRepository)
	.inSingletonScope();
container
	.bind<ISkillRepository>(TYPES.SkillRepository)
	.to(SkillRepository)
	.inSingletonScope();
container
	.bind<IMentorSkillRepository>(TYPES.MentorSkillRepository)
	.to(MentorSkillRepository)
	.inSingletonScope();
container
	.bind<IMentorLanguageRepository>(TYPES.MentorLanguageRepository)
	.to(MentorLanguageRepository)
	.inSingletonScope();
container
	.bind<ILanguageRepository>(TYPES.LanguageRepository)
	.to(LanguageRepository)
	.inSingletonScope();
container
	.bind<IDomainRepository>(TYPES.DomainRepository)
	.to(DomainRepository)
	.inSingletonScope();
container
	.bind<ISocialLinkRepository>(TYPES.SocaiLinkRepository)
	.to(SocaiLinkRepository)
	.inSingletonScope();
container
	.bind<IMentorBookingRulesRepository>(TYPES.MentorBookingRulesRepository)
	.to(MentorBookingRulesRepository)
	.inSingletonScope();
container
	.bind<ISessionRepository>(TYPES.SessionRepository)
	.to(SessionRepository)
	.inSingletonScope();
//usecase
container
	.bind<IDeleteSessionUsecase>(TYPES.DeleteSessionUsecase)
	.to(DeleteSessionUsecase)
	.inSingletonScope();
container
	.bind<IEditSessionUsecase>(TYPES.EditSessionUsecase)
	.to(EditSessionUsecase)
	.inSingletonScope();
container
	.bind<ISessionController>(TYPES.SessionController)
	.to(SessionController)
	.inSingletonScope();
container
	.bind<IAddSessionUsecase>(TYPES.AddSessionUsecase)
	.to(AddSessionUsecase)
	.inSingletonScope();
container
	.bind<IChangePasswordUsecase>(TYPES.ChangePasswordUsecase)
	.to(ChangePasswordUsecase)
	.inSingletonScope();
container
	.bind<IMentorStatusUpdateUsecase>(TYPES.MentorStatusUpdateUsecase)
	.to(MentorStatusUpdateUsecase)
	.inSingletonScope();
container
	.bind<IUpdateMentorBookingRulesUsecase>(TYPES.UpdateMentorBookingRulesUsecase)
	.to(UpdateMentorBookingRulesUsecase)
	.inSingletonScope();
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

container
	.bind<IVerifyMentorUsecase>(TYPES.VerifyMentorUsecase)
	.to(VerifyMentorUsecase)
	.inSingletonScope();

container
	.bind<IAddEducationUsecase>(TYPES.AddEducationUsecase)
	.to(AddEducationUsecase)
	.inSingletonScope();

container
	.bind<IEditEducationUsecase>(TYPES.EditEducationUsecase)
	.to(EditEducationUsecase)
	.inSingletonScope();

container
	.bind<IDeleteEducationUsecase>(TYPES.DeleteEducationUsecase)
	.to(DeleteEducationUsecase)
	.inSingletonScope();

container
	.bind<IAddExperienceUsecase>(TYPES.AddExperienceUsecase)
	.to(AddExperienceUsecase)
	.inSingletonScope();

container
	.bind<IEditExperienceUsecase>(TYPES.EditExperienceUsecase)
	.to(EditExperienceUsecase)
	.inSingletonScope();

container
	.bind<IDeleteExperienceUsecase>(TYPES.DeleteExperienceUsecase)
	.to(DeleteExperienceUsecase)
	.inSingletonScope();

container
	.bind<IAddAchievementUsecase>(TYPES.AddAchievementUsecase)
	.to(AddAchievementUsecase)
	.inSingletonScope();
container
	.bind<IGetSkillsUsecase>(TYPES.GetSkillUsecase)
	.to(GetSkillUsecase)
	.inSingletonScope();

container
	.bind<IGetMentorProfileUsecase>(TYPES.GetMentorProfileUsecase)
	.to(GetMentorProfileUsecase)
	.inSingletonScope();

container
	.bind<IAddMentorSkillUsecase>(TYPES.AddMentorSkillUsecase)
	.to(AddMentorSkillUsecase)
	.inSingletonScope();

container
	.bind<IDeleteMentorSkillUsecase>(TYPES.DeleteMentorSkillUsecase)
	.to(DeleteMentorSkillUsecase)
	.inSingletonScope();
container
	.bind<IAddMentorLanguageUsecase>(TYPES.AddMentorLanguageUsecase)
	.to(AddMentorLanguageUsecase)
	.inSingletonScope();

container
	.bind<IDeleteMentorLanguageUsecase>(TYPES.DeleteMentorLanguageUsecase)
	.to(DeleteMentorLanguageUsecase)
	.inSingletonScope();
container
	.bind<IGetLanguagesUsecase>(TYPES.GetLanguageUsecase)
	.to(GetLanguageUsecase)
	.inSingletonScope();

container
	.bind<IEditUserProfileUsecase>(TYPES.EditUserProfileUsecase)
	.to(EditUserProfileUsecase)
	.inSingletonScope();

container
	.bind<IGetDomainUsecase>(TYPES.GetDomainUsecase)
	.to(GetDomainUsecase)
	.inSingletonScope();
container
	.bind<IUpdateMentorOverviewUsecase>(TYPES.UpdateMentorOverviewUsecase)
	.to(UpdateMentorOverviewUsecase)
	.inSingletonScope();
container
	.bind<ICreateSocaiLinksUsecase>(TYPES.CreateSocialLinksUsecse)
	.to(CreateSocialLinksUsecse)
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
container
	.bind<IProfileController>(TYPES.ProfileMentorController)
	.to(ProfileController)
	.inSingletonScope();
container
	.bind<ISettingsController>(TYPES.SettingController)
	.to(SettingController)
	.inSingletonScope();
// queries

container
	.bind<IMentorQuery>(TYPES.MentorQuery)
	.to(MentorQuery)
	.inSingletonScope();

// db client
container.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(prisma);
container
	.bind<AppRedisClientType>(TYPES.RedisClient)
	.toConstantValue(redisClient);

export { container };
