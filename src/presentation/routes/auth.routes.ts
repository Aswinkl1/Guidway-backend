import { loginInputSchema } from "@application/dto/user/loginUser.dto";
import { container } from "@config/DI-container/container";
import { TYPES } from "@config/DI-container/TYPES";
import { Role } from "@domain/entities/user";
import type { IAuthController } from "@presentation/interface/controllers/IAuthController";
import { authorizedRoles } from "@presentation/middleware/authorization.middleware";
import { isAuthenticate } from "@presentation/middleware/isAuthentication.middleware";
import validatetor from "@presentation/middleware/validation.middleware";
import { Router } from "express";

const authController = container.get<IAuthController>(TYPES.AuthController);
const router = Router();

router.post("/signup", authController.userSignUp);

router.get("/verify", authController.verifyUser);
router.get("/refresh", authController.refreshToken);
router.post(
  "/login",
  validatetor(loginInputSchema, "body"),
  authController.userLogin,
);

router.get(
  "/",
  isAuthenticate,
  authorizedRoles(Role.MENTEE),
  authController.mock,
);

router.post("/forget-password", authController.forgetPassword);
router.patch("/reset-password", authController.resetPassword);

router.post(
  "/admin/login",
  validatetor(loginInputSchema, "body"),
  authController.adminLogin,
);

router.post("/logout", authController.logout);

router.post("/upload-url", isAuthenticate, authController.getSignedUrl);
export default router;
