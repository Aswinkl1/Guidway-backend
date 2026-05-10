/** biome-ignore-all lint/style/noNonNullAssertion: dto will have the return values */
import type {
	UpdateMentorOverviewDTO,
	UpdateMentorOverviewOutputDTO,
} from "@application/dto/mentor/updateMentorOverview.dto";
import { NotFoundError } from "@application/errors/NotFoundError";
import type { IMentorRepository } from "@application/ports/repository/IMentorRepository";
import type { IUpdateMentorOverviewUsecase } from "@application/ports/usecase/mentor/IUpdateMentorOverview.usecase";

export class UpdateMentorOverviewUsecase
	implements IUpdateMentorOverviewUsecase
{
	constructor(private readonly _mentorRepoitory: IMentorRepository) {}

	async execute(
		mentorId: string,
		dto: UpdateMentorOverviewDTO,
	): Promise<UpdateMentorOverviewOutputDTO> {
		const mentor = await this._mentorRepoitory.findMentorByUserId(mentorId);

		if (!mentor) {
			throw new NotFoundError("metor not found");
		}

		mentor.update(dto);

		const updatedMentor = await this._mentorRepoitory.save(mentorId, mentor);

		return {
			domainId: updatedMentor.domainId!,
			headline: updatedMentor.headline!,
			shortBio: updatedMentor.shortBio!,
		};
	}
}
