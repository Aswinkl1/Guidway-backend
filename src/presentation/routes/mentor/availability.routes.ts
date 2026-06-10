import {
	createAvailabilitySchema,
	ToggleAvailabilitySchema,
} from "@application/dto/mentor/availability.dto";
import { getSlotSchema } from "@application/dto/mentor/slot.dto";
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

router.delete(
	ROUTES.MENTOR.AVAILABILITY.DETAIL,
	isAuthenticate,
	AvailabilityController.deleteAvailablity,
);

router.patch(
	ROUTES.MENTOR.AVAILABILITY.ROOT,
	isAuthenticate,
	validatetor(ToggleAvailabilitySchema, "body"),
	AvailabilityController.toggleAvailability,
);

router.get(
	ROUTES.MENTOR.SLOTS.ROOT,
	isAuthenticate,
	validatetor(getSlotSchema, "query"),
	AvailabilityController.getSlotsByDate,
);
export default router;
