import { AuthController } from "@presentation/controllers/auth.controller";
import { signUpUsecase } from "../usecase/signup.usecase.container";
import { verifyEmailUseCase } from "../usecase/emaiVerify.usecase.container";
import { loginUsecase } from "../usecase/login.usecase.container";

const authController = new AuthController(
  signUpUsecase,
  verifyEmailUseCase,
  loginUsecase,
);

export { authController };
