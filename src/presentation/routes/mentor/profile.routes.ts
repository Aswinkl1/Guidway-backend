import { CreateAchievementSchema } from "@application/dto/mentor/acheivement.dto";
import { EditEducationSchema } from "@application/dto/mentor/education.dto";
import {
	CreateExperienceSchema,
	EditExperienceSchema,
} from "@application/dto/mentor/experience.dto";
import {
	DeleteMentorSkillSchema,
	MentorSkillSchema,
} from "@application/dto/mentor/mentorSkill.dto";
import { GetSkillsQueryDto } from "@application/dto/mentor/skill.dto";
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
export default router;
