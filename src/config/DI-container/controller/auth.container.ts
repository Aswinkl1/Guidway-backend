import { AuthController } from "@presentation/controllers/auth.controller";
import { signUpUsecase } from "../usecase/signup.usecase.container";

const authController = new AuthController(signUpUsecase);

export { authController };
