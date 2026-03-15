import { container } from "@config/DI-container/container";
import { TYPES } from "@config/DI-container/TYPES";
import { IAuthController } from "@presentation/interface/controllers/IAuthController";
import { authorizedRoles } from "@presentation/middleware/authorization.middleware";
import { isAuthenticate } from "@presentation/middleware/isAuthentication.middleware";
import { Router } from "express";

const authController = container.get<IAuthController>(TYPES.AuthController);
const router = Router();

router.post("/signup", authController.userSignUp);

router.get("/verify", authController.verifyUser);
router.post("/refresh", authController.refreshToken);
router.post("/login", authController.userLogin);

router.get(
  "/",
  isAuthenticate,
  authorizedRoles("student"),
  authController.mock,
);

router.post("/forget-password", authController.forgetPassword);
router.patch("/reset-password", authController.resetPassword);

export default router;
