import type { GetSkillsQueryDto } from "@application/dto/mentor/skill.dto";
import {
	SkillMapper,
	type SkillOutputDto,
} from "@application/mappers/skills.mapper";
import type { ISkillRepository } from "@application/ports/repository/ISkill.repository";
import type { IGetSkillsUsecase } from "@application/ports/usecase/mentor/skills/IGetSkills.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { inject, injectable } from "inversify";
@injectable()
export class GetSkillUsecase implements IGetSkillsUsecase {
	constructor(
		@inject(TYPES.SkillRepository)
		private readonly _skillReporitory: ISkillRepository,
	) {}
	async execute(dto: GetSkillsQueryDto): Promise<SkillOutputDto[]> {
		const record = await this._skillReporitory.findAll(dto);
		return SkillMapper.toOutputList(record);
	}
}
