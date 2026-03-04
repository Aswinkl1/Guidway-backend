import { authController } from "@config/DI-container/controller/auth.container";
import { authorizedRoles } from "@presentation/middleware/authorization.middleware";
import { isAuthenticate } from "@presentation/middleware/isAuthentication.middleware";
import { Router } from "express";

const router = Router();

router.post("/signup", authController.userSignUp);

router.get("/verify", authController.verifyUser);
// router.post("refresh");
router.post("/login", authController.userLogin);

router.get(
  "/",
  isAuthenticate,
  authorizedRoles("student"),
  authController.mock,
);

router.post("/forget-password", authController.forgetPassword);
// router.patch("/reset-password")

export default router;
