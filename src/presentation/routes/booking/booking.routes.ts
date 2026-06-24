import { getBookingSetupSchema } from "@application/dto/booking/getBookingSetup.dto";
import { holdSlotSchema } from "@application/dto/booking/slotHold.dto";
import { container } from "@config/DI-container/container";
import { TYPES } from "@config/DI-container/TYPES";
import type { IBookingController } from "@presentation/interface/controllers/booking/IBookingController";
import { isAuthenticate } from "@presentation/middleware/isAuthentication.middleware";
import validatetor from "@presentation/middleware/validation.middleware";
import { Router } from "express";

const router = Router();
const BookingController = container.get<IBookingController>(
	TYPES.BookingController,
);
router.post(
	"/booking/initiate",
	isAuthenticate,
	validatetor(holdSlotSchema, "body"),
	BookingController.createBookingIntent,
);

router.get(
	"/mentor/:mentorId/session/:sessionId",
	isAuthenticate,
	validatetor(getBookingSetupSchema, "query"),
	BookingController.getBookingSetupDetails,
);
export default router;
