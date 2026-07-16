import type { loginOutputDTO } from "@application/dto/user/loginUser.dto";

export interface IRefreshTokenUsecase {
	execute(token: string): Promise<Omit<loginOutputDTO, "refreshToken">>;
}
