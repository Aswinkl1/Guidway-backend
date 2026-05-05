import type { IAchievementRepository } from "@application/ports/repository/IAcheivement.repository";
import { TYPES } from "@config/DI-container/TYPES";
import { Achievement } from "@domain/mentor/entities/achievement.entity";
import type {
	AchievementType,
	Prisma,
	Achievement as PrismaAchievement,
	PrismaClient,
} from "generated/prisma/client";
import { inject } from "inversify";
import { BaseRepository } from "./BaseRepository";

export default class AchievementRepository
	extends BaseRepository<
		PrismaAchievement,
		Achievement,
		Prisma.AchievementCreateInput,
		Prisma.AchievementUpdateInput
	>
	implements IAchievementRepository
{
	constructor(@inject(TYPES.PrismaClient) private _prisma: PrismaClient) {
		super(_prisma.achievement);
	}
	protected toDomain(record: PrismaAchievement): Achievement {
		return Achievement.create(record);
	}

	protected toPersistence(
		entity: Partial<Achievement>,
	): Omit<Prisma.AchievementCreateInput, "createdAt" | "updatedAt"> {
		return {
			...(entity.id !== undefined && { id: entity.id }),
			mentor: { connect: { userId: entity.mentorId } },
			title: entity.title ?? null,
			type: entity.type as AchievementType,
			year: entity.year ?? null,
			deletedAt: entity.deletedAt ?? null,
		};
	}
}
