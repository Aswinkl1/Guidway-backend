import {
	CreateAchievementSchema,
	EditAchievementSchema,
} from "@application/dto/mentor/acheivement.dto";
import { GetDomainQueryDto } from "@application/dto/mentor/domain.dto";
import { EditEducationSchema } from "@application/dto/mentor/education.dto";
import {
	CreateExperienceSchema,
	EditExperienceSchema,
} from "@application/dto/mentor/experience.dto";
import { GetLanguagesQueryDto } from "@application/dto/mentor/language.dto";
import { MentorLanguageSchema } from "@application/dto/mentor/mentorLanguage.dto";
import { MentorSkillSchema } from "@application/dto/mentor/mentorSkill.dto";
import { GetSkillsQueryDto } from "@application/dto/mentor/skill.dto";
import { CreateSocialLinkSchema } from "@application/dto/mentor/socialLink.dto";
import { UpdateMentorOverviewSchema } from "@application/dto/mentor/updateMentorOverview.dto";
import { container } from "@config/DI-container/container";
import { TYPES } from "@config/DI-container/TYPES";
import { ROUTES } from "@presentation/constants/routes";
import type { IProfileController } from "@presentation/interface/controllers/IProfileController";
import { isAuthenticate } from "@presentation/middleware/isAuthentication.middleware";
import validatetor from "@presentation/middleware/validation.middleware";
import { Router } from "express";

const router = Router();

const ProfileController = container.get<IProfileController>(
	TYPES.ProfileMentorController,
);

router.post(
	ROUTES.MENTOR.EDUCATION.ROOT,
	isAuthenticate,
	ProfileController.addEducation,
);

router.put(
	ROUTES.MENTOR.EDUCATION.DETAIL,
	isAuthenticate,
	validatetor(EditEducationSchema, "body"),
	ProfileController.updateEducation,
);

router.delete(
	ROUTES.MENTOR.EDUCATION.DETAIL,
	isAuthenticate,
	ProfileController.deleteEducation,
);

router.post(
	ROUTES.MENTOR.EXPERIENCE.ROOT,
	isAuthenticate,
	validatetor(CreateExperienceSchema, "body"),
	ProfileController.addExperience,
);

router.put(
	ROUTES.MENTOR.EXPERIENCE.DETAIL,
	isAuthenticate,
	validatetor(EditExperienceSchema, "body"),
	ProfileController.editExperience,
);

router.delete(
	ROUTES.MENTOR.EXPERIENCE.DETAIL,
	isAuthenticate,
	ProfileController.deleteExperience,
);

router.post(
	ROUTES.MENTOR.ACHIEVEMENT.ROOT,
	isAuthenticate,
	validatetor(CreateAchievementSchema, "body"),
	ProfileController.addAchievement,
);

router.get(
	ROUTES.MENTOR.SKILL.ROOT,
	validatetor(GetSkillsQueryDto, "query"),
	ProfileController.getAllSkills,
);

router.put(
	ROUTES.MENTOR.SKILL.DETAIL,
	isAuthenticate,
	validatetor(MentorSkillSchema, "body"),
	ProfileController.addOrUpdateMentorSkills,
);

router.delete(
	ROUTES.MENTOR.SKILL.DETAIL,
	isAuthenticate,
	ProfileController.removeMentorSkill,
);

router.get(
	ROUTES.MENTOR.PROFILE.ROOT,
	isAuthenticate,
	ProfileController.getMentorProfile,
);

router.put(
	ROUTES.MENTOR.LANGUAGE.DETAIL,
	isAuthenticate,
	validatetor(MentorLanguageSchema, "body"),
	ProfileController.addOrUpdateMentorLanguage,
);

router.delete(
	ROUTES.MENTOR.LANGUAGE.DETAIL,
	isAuthenticate,
	ProfileController.removeMentorLanguage,
);

router.get(
	ROUTES.MENTOR.LANGUAGE.ROOT,
	validatetor(GetLanguagesQueryDto, "query"),
	ProfileController.getAllLanguages,
);

router.get(
	ROUTES.MENTOR.DOMAIN.ROOT,
	validatetor(GetDomainQueryDto, "query"),
	ProfileController.getAllDomains,
);

router.patch(
	ROUTES.MENTOR.PROFILE.ROOT,
	isAuthenticate,
	validatetor(UpdateMentorOverviewSchema, "body"),
	ProfileController.updateMentorOverview,
);

router.put(
	ROUTES.MENTOR.SOCIALMEDIA_LINKS.ROOT,
	isAuthenticate,
	validatetor(CreateSocialLinkSchema, "body"),
	ProfileController.updateSocailMediaLinks,
);

router.patch(
	ROUTES.MENTOR.PROFILE_IMAGE,
	isAuthenticate,
	ProfileController.updateProfileKey,
);

router.put(
	ROUTES.MENTOR.ACHIEVEMENT.DETAIL,
	isAuthenticate,
	validatetor(EditAchievementSchema, "body"),
	ProfileController.updateAchievement,
);

router.delete(
	ROUTES.MENTOR.ACHIEVEMENT.DETAIL,
	isAuthenticate,
	ProfileController.deleteAchievement,
);
export default router;
