import type { SocialLinks } from "@domain/mentor/entities/socialLink.entity";

export class SocialLinkMapper {
	static toOutput(data: SocialLinks): SocialLinkOutputDto {
		return {
			url: data.url,
			platform: data.platform,
		};
	}
}

export interface SocialLinkOutputDto {
	url: string;
	platform: string;
}
