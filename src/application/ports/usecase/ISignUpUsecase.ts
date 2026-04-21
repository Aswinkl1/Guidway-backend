import type { signupUserDTO } from "@application/dto/user/signupUser.dto";

export interface ISignUpUsecase {
	execute(data: signupUserDTO): Promise<void>;
}
