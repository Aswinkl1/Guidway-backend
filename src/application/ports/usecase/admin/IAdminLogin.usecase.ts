import type {
	loginOutputDTO,
	loginUserInputDTO,
} from "@application/dto/user/loginUser.dto";

export interface IAdminLoginUsecase {
	execute(dto: loginUserInputDTO): Promise<loginOutputDTO>;
}
