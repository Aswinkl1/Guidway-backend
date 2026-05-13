import {
	CreateSessionSchema,
	editSessionSchema,
} from "@application/dto/mentor/session.dto";
import { container } from "@config/DI-container/container";
import { TYPES } from "@config/DI-container/TYPES";
import { ROUTES } from "@presentation/constants/routes";
import type { ISessionController } from "@presentation/interface/controllers/ISession.controller";
import { isAuthenticate } from "@presentation/middleware/isAuthentication.middleware";
import validatetor from "@presentation/middleware/validation.middleware";
import { Router } from "express";

const router = Router();
const SessionController = container.get<ISessionController>(
	TYPES.SessionController,
);
router.post(
	ROUTES.MENTOR.SESSION.ROOT,
	isAuthenticate,
	validatetor(CreateSessionSchema, "body"),
	SessionController.addSession,
);

router.patch(
	ROUTES.MENTOR.SESSION.DETAIL,
	isAuthenticate,
	validatetor(editSessionSchema, "body"),
	SessionController.editSession,
);
export default router;
