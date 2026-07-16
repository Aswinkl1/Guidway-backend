import { EditUserProfileSchema } from "@application/dto/user/EditProfile.dto";
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

router.patch(
	ROUTES.USER.DETAIL,
	isAuthenticate,
	validatetor(EditUserProfileSchema, "body"),
	ProfileController.EditUserProfile,
);

export default router;
