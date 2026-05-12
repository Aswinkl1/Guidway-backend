import type { ChangePasswordDTO } from "@application/dto/user/changePassword.dto";

export interface IChangePasswordUsecase {
	execute(userId: string, dto: ChangePasswordDTO): Promise<void>;
}
