import type { DeleteEducationDTO } from "@application/dto/mentor/education.dto";
import { ForbiddenError } from "@application/errors/ForbidenError";
import { NotFoundError } from "@application/errors/NotFoundError";
import type { IEducationRepository } from "@application/ports/repository/IEducation.repository";
import type { IDeleteEducationUsecase } from "@application/ports/usecase/mentor/education/IDelete-Education.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { inject, injectable } from "inversify";
@injectable()
export class DeleteEducationUsecase implements IDeleteEducationUsecase {
	constructor(
		@inject(TYPES.EducationRepository)
		private readonly educationRepository: IEducationRepository,
	) {}

	async execute(dto: DeleteEducationDTO): Promise<void> {
		const educationRecord = await this.educationRepository.findById(dto.id);

		if (!educationRecord) {
			throw new NotFoundError("No education record found with the provided ID");
		}

		if (educationRecord.mentorId !== dto.mentorId) {
			throw new ForbiddenError(
				"You do not have permission to delete this record",
			);
		}
		educationRecord.delete();
		// cons/ole.log(educationRecord);
		const a = await this.educationRepository.save(
			educationRecord.id,
			educationRecord,
		);
		console.log(a);
	}
}
