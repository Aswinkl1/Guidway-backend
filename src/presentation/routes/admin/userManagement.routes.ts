import { getUsersSchema } from "@application/dto/admin/GetUsers.dto";
import { container } from "@config/DI-container/container";
import { TYPES } from "@config/DI-container/TYPES";
import type { IUserManagementController } from "@presentation/interface/controllers/IUserManagement.controller";
import validatetor from "@presentation/middleware/validation.middleware";
import { Router } from "express";

const router = Router();
const userManagementController = container.get<IUserManagementController>(
	TYPES.UserManagementController,
);

router.get(
	"/users",
	validatetor(getUsersSchema, "query"),
	userManagementController.getAllUsers,
);

export default router;
