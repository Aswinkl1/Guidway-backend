import { forgetPasswordDTO } from "@application/dto/user/forgetPassword.dto";

export interface IForgetPasswordUsecase {
  execute(dto: forgetPasswordDTO): Promise<{ email: string }>;
}
