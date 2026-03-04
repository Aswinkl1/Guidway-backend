import { resetPasswordDTO } from "@application/dto/user/resetPassword.dto";

export interface IResetPassswordUsecase {
  execute(dto: resetPasswordDTO): Promise<void>;
}
