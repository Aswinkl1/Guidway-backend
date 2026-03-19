import { type loginUserInputDTO } from '@application/dto/user/loginUser.dto';
import { type LoginResponceDTO } from '@application/dto/Responce/loginResponce.dto';

export interface IAdminLoginUsecase {
  execute(dto: loginUserInputDTO): Promise<LoginResponceDTO>;
}
