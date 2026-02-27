import { SignUpUser } from "@application/useCases/user/SignUp.usecase";
import { userRepo } from "../repository.container";
// import { userRepo } from "../repository.container";

const signUpUsecase = new SignUpUser(userRepo);

export { signUpUsecase };
