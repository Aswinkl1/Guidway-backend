import type { IMentorBookingRulesRepository } from "@application/ports/repository/IMentorBookingRules.repositoty";
import { TYPES } from "@config/DI-container/TYPES";
import { MentorBookingRuleVO } from "@domain/mentor/value_object/mentor.bookingRules.vo";
import type {
	MentorBookingSettings as mentorBookingType,
	PrismaClient,
} from "generated/prisma/client";
import { inject, injectable } from "inversify";

@injectable()
export class MentorBookingRulesRepository
	implements IMentorBookingRulesRepository
{
	constructor(
		@inject(TYPES.PrismaClient) private readonly _prisma: PrismaClient,
	) {}

	async findByUserId(userId: string): Promise<MentorBookingRuleVO | null> {
		const record = await this._prisma.mentorBookingSettings.findUnique({
			where: { userId },
		});
		if (!record) {
			return null;
		}

		return this.toDomain(record);
	}

	async upsert(rules: MentorBookingRuleVO): Promise<MentorBookingRuleVO> {
		const data = this.toPersistence(rules);
		const record = await this._prisma.mentorBookingSettings.upsert({
			where: { userId: rules.userId },
			create: data,
			update: data,
		});

		return this.toDomain(record);
	}

	async createDefault(userId: string): Promise<MentorBookingRuleVO> {
		const record = await this._prisma.mentorBookingSettings.create({
			data: { userId },
		});

		return this.toDomain(record);
	}

	private toDomain(data: mentorBookingType): MentorBookingRuleVO {
		return MentorBookingRuleVO.create({
			userId: data.userId,
			bufferTimeMinutes: data.bufferTimeMinutes,
			cancellationCutoffHours: data.cancellationCutoffHours,
			futureLimitDays: data.futureLimitDays,
			leadTimeHours: data.leadTimeHours,
			maxSessionsDaily: data.maxSessionsDaily,
			updatedAt: data.updatedAt,
		});
	}

	private toPersistence(vo: MentorBookingRuleVO) {
		const data = vo.toJSON();
		return {
			userId: data.userId,
			leadTimeHours: data.leadTimeHours,
			futureLimitDays: data.futureLimitDays,
			maxSessionsDaily: data.maxSessionsDaily,
			bufferTimeMinutes: data.bufferTimeMinutes,
			cancellationCutoffHours: data.cancellationCutoffHours,
			updatedAt: data.updatedAt,
		};
	}
}
