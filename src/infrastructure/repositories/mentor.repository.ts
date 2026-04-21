import type { IMentorRepository } from "@application/ports/repository/IMentorRepository";
import { TYPES } from "@config/DI-container/TYPES";
import { Mentor } from "@domain/mentor/mentor.entity";
import { prisma } from "@infrastructure/database/prisma";
import type {
	Prisma,
	PrismaClient,
	Mentor as PrismaMentor,
} from "generated/prisma/client";
import { inject, injectable } from "inversify";
import { BaseRepository } from "./BaseRepository";

type UpdateInput = Prisma.MentorUpdateInput;
type CreateInput = Prisma.MentorCreateInput;
@injectable()
export default class MentorRepository
	extends BaseRepository<PrismaMentor, Mentor, CreateInput, UpdateInput>
	implements IMentorRepository
{
	constructor(@inject(TYPES.PrismaClient) private _prisma: PrismaClient) {
		super(prisma.mentor);
	}

	protected toDomain(record: PrismaMentor) {
		return Mentor.create(record);
	}

	protected toPersistence(
		mentorEntity: Mentor,
	): Omit<Prisma.MentorCreateInput, "createdAt" | "updatedAt"> {
		const mentorDetails = mentorEntity.toPrimitive();
		return {
			id: mentorDetails.id,
			user: { connect: { id: mentorDetails.userId } },
			status: mentorDetails.status,
			domain: mentorDetails.domainId
				? { connect: { id: mentorDetails.domainId } }
				: undefined,
			headline: mentorDetails.headline,
			isVerified: mentorDetails.isVerified,
			reviewCount: mentorDetails.reviewCount,
			stripeAccountId: mentorDetails.stripeAccountId,
			stripeOnboardingComplete: mentorDetails.stripeOnboardingComplete,
			shortBio: mentorDetails.shortBio,
		};
	}
}
