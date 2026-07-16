import { getAllBookingSchema } from "@application/dto/booking/booking.dto";
import { verifyPaymentSchema } from "@application/dto/booking/confirmBooking.dto";
import { getBookingSetupSchema } from "@application/dto/booking/getBookingSetup.dto";
import { rescheduleBookingSchema } from "@application/dto/booking/rescheduleBooking.dto";
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
	BookingController.getAllMentorBooking,
);

router.put(
	"/user/bookings/:id/cancel",
	isAuthenticate,
	BookingController.cancelBookingByUser,
);

router.put(
	"/mentor/bookings/:id/cancel",
	isAuthenticate,
	BookingController.cancelBookingByMentor,
);

router.put(
	"/user/bookings/:id/reschedule",
	isAuthenticate,
	validatetor(rescheduleBookingSchema, "body"),
	BookingController.rescheduleBooking,
);

router.patch(
	"/slots/:id/release",
	isAuthenticate,
	BookingController.releaseBookingSlot,
);
export default router;
