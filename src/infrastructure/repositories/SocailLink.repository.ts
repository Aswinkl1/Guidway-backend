import type { ISocialLinkRepository } from "@application/ports/repository/ISocialLinks.reposiroty";
import { TYPES } from "@config/DI-container/TYPES";
import { SocialLinks } from "@domain/mentor/entities/socialLink.entity";
import type {
	Prisma,
	PrismaClient,
	SocialLink as PrismaSocialLink,
} from "generated/prisma/client";
import { inject, injectable } from "inversify";
import { BaseRepository } from "./BaseRepository";
@injectable()
export class SocaiLinkRepository
	extends BaseRepository<
		PrismaSocialLink,
		SocialLinks,
		Prisma.SocialLinkCreateInput,
		Prisma.SocialLinkUpdateInput
	>
	implements ISocialLinkRepository
{
	constructor(
		@inject(TYPES.PrismaClient) private readonly _prisma: PrismaClient,
	) {
		super(_prisma.socialLink);
	}
	async deleteAll(mentorId: string): Promise<void> {
		console.log(mentorId);

		await this._prisma.socialLink.deleteMany({
			where: { mentorId },
		});
	}
	async createMany(
		data: Pick<SocialLinks, "mentorId" | "platform" | "url">[],
	): Promise<SocialLinks[]> {
		const record = await this._prisma.socialLink.createManyAndReturn({
			data,
		});
		return record.map((v) => this.toDomain(v));
	}

	protected toDomain(record: {
		platform: string;
		url: string;
		id: string;
		mentorId: string;
	}): SocialLinks {
		return SocialLinks.Create(record);
	}
	protected toPersistence(
		entity: SocialLinks,
	): Omit<Prisma.SocialLinkCreateInput, "createdAt" | "updatedAt"> {
		return {
			id: entity.id,
			mentor: { connect: { userId: entity.mentorId } },
			platform: entity.platform,
			url: entity.url,
		};
	}
}
