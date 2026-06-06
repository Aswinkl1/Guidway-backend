import { createAvailabilitySchema } from "@application/dto/mentor/availability.dto";
import { container } from "@config/DI-container/container";
import { TYPES } from "@config/DI-container/TYPES";
import { ROUTES } from "@presentation/constants/routes";
import type { IAvailabilityController } from "@presentation/interface/controllers/mentor/IAvailability.controller";
import { isAuthenticate } from "@presentation/middleware/isAuthentication.middleware";
import validatetor from "@presentation/middleware/validation.middleware";
import { Router } from "express";

const router = Router();

const AvailabilityController = container.get<IAvailabilityController>(
	TYPES.AvailabilityController,
);

router.post(
	ROUTES.MENTOR.AVAILABILITY.ROOT,
	isAuthenticate,
	validatetor(createAvailabilitySchema, "body"),
	AvailabilityController.addAvalilability,
);

router.get(
	ROUTES.MENTOR.AVAILABILITY.ROOT,
	isAuthenticate,
	AvailabilityController.getAllAvailability,
);

export default router;
