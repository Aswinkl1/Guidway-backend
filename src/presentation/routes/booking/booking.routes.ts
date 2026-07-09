import { getAllBookingSchema } from "@application/dto/booking/booking.dto";
import { verifyPaymentSchema } from "@application/dto/booking/confirmBooking.dto";
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
	validatetor(getBookingSetupSchema, "params"),
	BookingController.getBookingSetupDetails,
);

router.post(
	"/booking/confirm",
	isAuthenticate,
	validatetor(verifyPaymentSchema, "body"),
	BookingController.confirmBooking,
);

router.get(
	"/user/bookings/:id",
	isAuthenticate,
	BookingController.menteeBookingDetails,
);

router.get(
	"/mentor/bookings/:id",
	isAuthenticate,
	BookingController.getMentorBookingDetails,
);

router.get(
	"/user/bookings",
	isAuthenticate,
	validatetor(getAllBookingSchema, "query"),
	BookingController.getAllMenteeBooking,
);

router.get(
	"/mentor/bookings",
	isAuthenticate,
	validatetor(getAllBookingSchema, "query"),
	BookingController.getAllMenteeBooking,
);
export default router;
