import type { ISocialLinkRepository } from "@application/ports/repository/ISocialLinks.reposiroty";
import {
	type ISocialLinks,
	SocialLinks,
} from "@domain/mentor/entities/socialLink.entity";
import type {
	Prisma,
	PrismaClient,
	SocialLink as PrismaSocialLink,
} from "generated/prisma/client";
import { BaseRepository } from "./BaseRepository";

export class SocaiLinkRepository
	extends BaseRepository<
		PrismaSocialLink,
		SocialLinks,
		Prisma.SocialLinkCreateInput,
		Prisma.SocialLinkUpdateInput
	>
	implements ISocialLinkRepository
{
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
	constructor(private readonly _prisma: PrismaClient) {
		super(_prisma.socialLink);
	}
	async deleteAll(mentorId: string): Promise<void> {
		await this._prisma.socialLink.deleteMany({ where: { mentorId } });
	}
	async createMany(
		mentorId: string,
		data: Pick<ISocialLinks, "mentorId" | "platform" | "url">[],
	): Promise<SocialLinks[]> {
		const record = await this._prisma.socialLink.createManyAndReturn({
			data: data.map((item) => {
				return { ...item, mentorId };
			}),
		});
		return record.map((v) => this.toDomain(v));
	}
}
