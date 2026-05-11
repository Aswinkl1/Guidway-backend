import type { CreateSocialLinkDTO } from "@application/dto/mentor/socialLink.dto";
import {
	SocialLinkMapper,
	type SocialLinkOutputDto,
} from "@application/mappers/socialLink.mapper";
import type { IMentorRepository } from "@application/ports/repository/IMentorRepository";
import type { ISocialLinkRepository } from "@application/ports/repository/ISocialLinks.reposiroty";
import type { ICreateSocaiLinksUsecase } from "@application/ports/usecase/mentor/ICreateSocailLinks.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { NotFoundError } from "@domain/errors/UserError";
import { SocialPlatform } from "@domain/mentor/value_object/socalPlatform.vo";
import { inject, injectable } from "inversify";

@injectable()
export class CreateSocialLinksUsecse implements ICreateSocaiLinksUsecase {
	constructor(
		@inject(TYPES.MentorRepository)
		private readonly _mentorRepository: IMentorRepository,
		@inject(TYPES.SocaiLinkRepository)
		private readonly _socailLinkRepository: ISocialLinkRepository,
	) {}
	async execute(
		mentorId: string,
		dto: CreateSocialLinkDTO,
	): Promise<SocialLinkOutputDto[]> {
		const mentor = await this._mentorRepository.findMentorByUserId(mentorId);

		if (!mentor) {
			throw new NotFoundError("mentor not found");
		}

		await this._socailLinkRepository.deleteAll(mentorId);

		const data = dto.links.map((url: string) => {
			const platform = SocialPlatform.fromUrl(url);
			return { url, platform: platform.value, mentorId };
		});

		const record = await this._socailLinkRepository.createMany(data);

		return record.map((v) => SocialLinkMapper.toOutput(v));
	}
}
