import { LoginUsecase } from "@application/useCases/user/loginUser.usercase";
import { userRepo } from "../repository.container";
import { passwordHasher } from "../service.container";

const loginUsecase = new LoginUsecase(userRepo, passwordHasher);

export { loginUsecase };
