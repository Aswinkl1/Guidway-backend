import { EditEducationSchema } from "@application/dto/mentor/education.dot";
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

export default router;
