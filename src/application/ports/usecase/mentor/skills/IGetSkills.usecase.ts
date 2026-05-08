import type { GetSkillsQueryDto } from "@application/dto/mentor/skill.dto";
import type { SkillOutputDto } from "@application/mappers/skills.mapper";

export interface IGetSkillsUsecase {
	execute(dto: GetSkillsQueryDto): Promise<SkillOutputDto[]>;
}
