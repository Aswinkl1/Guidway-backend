import { loginInputSchema } from "@application/dto/user/loginUser.dto";
import { container } from "@config/DI-container/container";
import { TYPES } from "@config/DI-container/TYPES";
import { Role } from "@domain/user/user";
import { ROUTES } from "@presentation/constants/routes";
import type { IAuthController } from "@presentation/interface/controllers/IAuthController";
import { authorizedRoles } from "@presentation/middleware/authorization.middleware";
import { isAuthenticate } from "@presentation/middleware/isAuthentication.middleware";
import validatetor from "@presentation/middleware/validation.middleware";
import { Router } from "express";
import passport from "passport";

const authController = container.get<IAuthController>(TYPES.AuthController);
const router = Router();

router.post(ROUTES.AUTH.SIGNUP, authController.userSignUp);

router.get(ROUTES.AUTH.VERIFY, authController.verifyUser);

router.get(ROUTES.AUTH.REFRESH, authController.refreshToken);

router.post(
	ROUTES.AUTH.LOGIN,
	validatetor(loginInputSchema, "body"),
	authController.userLogin,
);

router.get(
	ROUTES.AUTH.ROOT,
	isAuthenticate,
	authorizedRoles(Role.MENTEE),
	authController.mock,
);

router.post(ROUTES.AUTH.FORGET_PASSWORD, authController.forgetPassword);

router.patch(ROUTES.AUTH.RESET_PASSWORD, authController.resetPassword);

router.post(
	ROUTES.AUTH.ADMIN_LOGIN,
	validatetor(loginInputSchema, "body"),
	authController.adminLogin,
);

router.post(ROUTES.AUTH.LOGOUT, authController.logout);

router.post(
	ROUTES.AUTH.UPLOAD_URL,
	isAuthenticate,
	authController.getSignedUrl,
);

router.get(
	ROUTES.AUTH.GOOGLE_AUTH,
	passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
	ROUTES.AUTH.GOOGLE_CALLBACK,
	passport.authenticate("google", {
		session: false,
		assignProperty: "OAuthUser",
	}),
	authController.oauthCallback,
);

router.get(
	ROUTES.AUTH.LINKEDIN_AUTH,
	passport.authenticate("oauth2", {
		scope: ["openid", "profile", "email"],
	}),
);

router.get(
	ROUTES.AUTH.LINKEDIN_CALLBACK,
	passport.authenticate("oauth2", {
		session: false,
		assignProperty: "OAuthUser",
	}),
	authController.oauthCallback,
);

export default router;
