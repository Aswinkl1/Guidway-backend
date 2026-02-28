import { SignUpUser } from "@application/useCases/user/SignUp.usecase";
import { userRepo, tokenRepo } from "../repository.container";
import { passwordHasher, tokenService } from "../service.container";

const signUpUsecase = new SignUpUser(
  userRepo,
  passwordHasher,
  tokenService,
  tokenRepo,
);

export { signUpUsecase };
