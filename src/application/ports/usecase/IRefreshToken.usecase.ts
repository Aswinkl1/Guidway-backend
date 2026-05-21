import type { loginOutputDTO } from "@application/dto/user/loginUser.dto";
import type { Role } from "@domain/user/user";

export interface IRefreshTokenUsecase {
	execute(token: string): Promise<Omit<loginOutputDTO, "refreshToken">>;
}
