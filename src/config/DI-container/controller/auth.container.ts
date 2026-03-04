import { AuthController } from "@presentation/controllers/auth.controller";
import { signUpUsecase } from "../usecase/signup.usecase.container";
import { verifyEmailUseCase } from "../usecase/emaiVerify.usecase.container";
import { loginUsecase } from "../usecase/login.usecase.container";
import { ForgetPassword } from "@application/useCases/user/forgetPassword.usecase";
import { tokenRepo, userRepo } from "../repository.container";
import { emailService, tokenService } from "../service.container";

const forgetPasswordUsecase = new ForgetPassword(
  userRepo,
  emailService,
  tokenService,
  tokenRepo,
);
const authController = new AuthController(
  signUpUsecase,
  verifyEmailUseCase,
  loginUsecase,
  forgetPasswordUsecase,
);

export { authController };
