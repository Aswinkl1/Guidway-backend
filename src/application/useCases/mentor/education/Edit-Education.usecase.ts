import type { EditEducationDTO } from "@application/dto/mentor/education.dto";
import { ForbiddenError } from "@application/errors/ForbidenError";
import { NotFoundError } from "@application/errors/NotFoundError";
import {
	EducationMapper,
	type EducationOutputDto,
} from "@application/mappers/education.mapper";
import type { IEducationRepository } from "@application/ports/repository/IEducation.repository";
import type { IEditEducationUsecase } from "@application/ports/usecase/mentor/education/IEdit-Education.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { inject, injectable } from "inversify";
@injectable()
export default class EditEducationUsecase implements IEditEducationUsecase {
	constructor(
		@inject(TYPES.EducationRepository)
		private readonly _educationRepository: IEducationRepository,
	) {}

	async execute(
		mentorId: string,
		dto: EditEducationDTO,
	): Promise<EducationOutputDto> {
		const record = await this._educationRepository.findById(dto.id);

		if (!record) {
			throw new NotFoundError("education no found");
		}

		if (record.mentorId !== mentorId) {
			throw new ForbiddenError("you dont have permission to do this action");
		}

		record.update(dto);

		const updatedRecord = await this._educationRepository.save(
			record.id,
			record,
		);

		return EducationMapper.toOutput(updatedRecord);
	}
}
