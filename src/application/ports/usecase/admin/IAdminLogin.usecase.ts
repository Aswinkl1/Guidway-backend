import type { LoginResponceDTO } from "@application/dto/Responce/loginResponce.dto";
import type { loginUserInputDTO } from "@application/dto/user/loginUser.dto";

export interface IAdminLoginUsecase {
	execute(dto: loginUserInputDTO): Promise<LoginResponceDTO>;
}
