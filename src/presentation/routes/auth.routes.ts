import { authController } from "@config/DI-container/controller/auth.container";
import { Router } from "express";

const router = Router();

router.post("/signup", authController.userSignUp);

router.get("/verify", authController.verifyUser);
export default router;
