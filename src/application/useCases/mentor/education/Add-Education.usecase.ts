import type { CreateEducationDTO } from "@application/dto/mentor/education.dto";
import {
	EducationMapper,
	type EducationOutputDto,
} from "@application/mappers/education.mapper";
import type { IEducationRepository } from "@application/ports/repository/IEducation.repository";
import type { IAddEducationUsecase } from "@application/ports/usecase/mentor/education/IAdd-Education.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { Education } from "@domain/mentor/entities/education.entity";
import { inject, injectable } from "inversify";

@injectable()
export class AddEducationUsecase implements IAddEducationUsecase {
	constructor(
		@inject(TYPES.EducationRepository)
		private readonly _educationRepository: IEducationRepository,
	) {}
	async execute(
		mentorId: string,
		dto: CreateEducationDTO,
	): Promise<EducationOutputDto> {
		// const mentor = await this._mentorRepository.findById(mentorId);

		// if (!mentor) {
		//   throw new NotFoundError("Mentor not found");
		// }
		const educationEntity = Education.create({ ...dto, mentorId });
		const domainEntity =
			await this._educationRepository.create(educationEntity);
		return EducationMapper.toOutput(domainEntity);
	}
}
