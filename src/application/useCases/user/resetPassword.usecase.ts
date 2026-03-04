import { resetPasswordDTO } from "@application/dto/user/resetPassword.dto";
import { IResetPassswordUsecase } from "@application/ports/usecase/IResetPassword.usecase";

export class ResetPasswordUsecase implements IResetPassswordUsecase {
  execute(dto: resetPasswordDTO): Promise<void> {
    throw new Error("hd");
  }
}
