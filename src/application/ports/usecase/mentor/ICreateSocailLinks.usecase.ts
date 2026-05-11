import type { CreateSocialLinkDTO } from "@application/dto/mentor/socialLink.dto";
import type { SocialLinkOutputDto } from "@application/mappers/socialLink.mapper";

export interface ICreateSocaiLinksUsecase {
	execute(
		mentorId: string,
		dto: CreateSocialLinkDTO,
	): Promise<SocialLinkOutputDto[]>;
}
