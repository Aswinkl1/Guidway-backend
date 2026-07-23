import { container } from "@config/DI-container/container";
import { TYPES } from "@config/DI-container/TYPES";
import { Role } from "@domain/user/user";
import type { IAdminBookingManagementController } from "@presentation/interface/controllers/admin/booking.controller";
import { authorizedRoles } from "@presentation/middleware/authorization.middleware";
import { isAuthenticate } from "@presentation/middleware/isAuthentication.middleware";
import { Router } from "express";

const router = Router();
const bookingController = container.get<IAdminBookingManagementController>(
	TYPES.AdminBookingManagementController,
);
router.get(
	"/booking/:id",
	isAuthenticate,
	authorizedRoles(Role.ADMIN),
	bookingController.getBookingDetails,
);
export default router;
