import type { Skill, SkillStatus } from "@domain/mentor/entities/skills.entity";

export interface SkillOutputDto {
	id: string;
	name: string;
	status: SkillStatus;
}
export class SkillMapper {
	static toOutput(data: Skill): SkillOutputDto {
		return {
			id: data.id,
			name: data.name,
			status: data.status,
		};
	}

	static toOutputList(data: Skill[]): SkillOutputDto[] {
		return data.map(SkillMapper.toOutput);
	}
}
