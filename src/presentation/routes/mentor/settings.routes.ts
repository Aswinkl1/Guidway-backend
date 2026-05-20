import { MentorStatusUpdateSchema } from "@application/dto/mentor/MentorStatusUpdate.dto";
import { UpdateBookingRulesSchema } from "@application/dto/mentor/mentorBookingRules.dto";
import { ChangePasswordSchema } from "@application/dto/user/changePassword.dto";
import { container } from "@config/DI-container/container";
import { TYPES } from "@config/DI-container/TYPES";
import { ROUTES } from "@presentation/constants/routes";
import type { ISettingsController } from "@presentation/interface/controllers/ISettings.controller";
import { isAuthenticate } from "@presentation/middleware/isAuthentication.middleware";
import validatetor from "@presentation/middleware/validation.middleware";
import { Router } from "express";

const router = Router();
const SettingController = container.get<ISettingsController>(
	TYPES.SettingController,
);
router.patch(
	ROUTES.MENTOR.SETTINGS.BOOKINGRULES,
	isAuthenticate,
	validatetor(UpdateBookingRulesSchema, "body"),
	SettingController.updateMentorBookingRules,
);

router.patch(
	ROUTES.MENTOR.SETTINGS.STATUS,
	isAuthenticate,
	validatetor(MentorStatusUpdateSchema, "body"),
	SettingController.updateMentorStatus,
);

router.patch(
	ROUTES.MENTOR.SETTINGS.CHANGE_PASSWORD,
	isAuthenticate,
	validatetor(ChangePasswordSchema, "body"),
	SettingController.resetPassword,
);

router.get(
	ROUTES.MENTOR.SETTINGS.ROOT,
	isAuthenticate,
	SettingController.getSettings,
);

export default router;
