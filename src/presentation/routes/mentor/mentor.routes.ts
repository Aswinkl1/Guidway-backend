import { publicListMentorSchema } from "@application/dto/mentor/listMentor.dto";
import { container } from "@config/DI-container/container";
import { TYPES } from "@config/DI-container/TYPES";
import { ROUTES } from "@presentation/constants/routes";
import type { IUserController } from "@presentation/interface/controllers/user/IUser.controller";
import validatetor from "@presentation/middleware/validation.middleware";
import { Router } from "express";

const router = Router();

const UserController = container.get<IUserController>(TYPES.UserController);
router.get(
	ROUTES.MENTOR.ROOT,
	validatetor(publicListMentorSchema, "query"),
	UserController.getListMentors,
);
export default router;
