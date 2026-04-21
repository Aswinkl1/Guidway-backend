import type {
	OAuthInputDTO,
	OAuthOutputDTO,
} from "@application/dto/user/OAuth.dto";

export interface IOAuthUseCase {
	execute(dto: OAuthInputDTO): Promise<OAuthOutputDTO>;
}
