import type {
	loginOutputDTO,
	loginUserInputDTO,
} from "@application/dto/user/loginUser.dto";

export interface ILoginUsecase {
	execute(dto: loginUserInputDTO): Promise<loginOutputDTO>;
}
