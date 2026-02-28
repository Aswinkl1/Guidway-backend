import { SignUpUser } from "@application/useCases/user/SignUp.usecase";
import { userRepo } from "../repository.container";
import { passwordHasher } from "../service.container";

const signUpUsecase = new SignUpUser(userRepo, passwordHasher);

export { signUpUsecase };
