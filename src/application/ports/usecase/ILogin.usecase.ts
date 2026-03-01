import { loginUserDTO } from "@application/dto/user/loginUser.dto";
import { User } from "@domain/entities/user";

export interface ILoginUsecase {
  execute(dto: loginUserDTO): Promise<Partial<User>>;
}
