import { VerifyEmailUseCase } from "@application/useCases/user/verifyEmail.usecase";
import { tokenRepo, userRepo } from "../repository.container";

const verifyEmailUseCase = new VerifyEmailUseCase(userRepo, tokenRepo);

export { verifyEmailUseCase };
