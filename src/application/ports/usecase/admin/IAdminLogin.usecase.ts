import { loginUserDTO } from "@application/dto/user/loginUser.dto";
import { LoginResponceDTO } from "@application/dto/Responce/loginResponce.dto";

export interface IAdminLoginUsecase {
  execute(dto: loginUserDTO): Promise<LoginResponceDTO>;
}
