import type { IMentorSkillRepository } from "@application/ports/repository/IMentorSkill.repository";
import { TYPES } from "@config/DI-container/TYPES";
import type { MentorSkillVO } from "@domain/mentor/value_object/mentor.skills.vo";
import type { PrismaClient } from "generated/prisma/client";
import { inject, injectable } from "inversify";
@injectable()
export class MentorSkillRepository implements IMentorSkillRepository {
	constructor(@inject(TYPES.PrismaClient) private _prisma: PrismaClient) {}

	upsert(vo: MentorSkillVO): Promise<MentorSkillVO> {
		throw new Error("Method not implemented.");
	}
	remove(mentorId: string, skillId: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
