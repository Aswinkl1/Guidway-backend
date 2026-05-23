import type { publicListMentorDto } from "@application/dto/mentor/listMentor.dto";
import {
	type IMentorListOutputDto,
	MentorListMapper,
} from "@application/mappers/menot-list.mapper";
import type { IMentorRepository } from "@application/ports/repository/IMentorRepository";
import type { IListMentorsUsecase } from "@application/ports/usecase/IListMentor.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { MentorStatus } from "@domain/mentor/mentor.entity";
import { inject, injectable } from "inversify";

@injectable()
export class ListMentorUsecase implements IListMentorsUsecase {
	constructor(
		@inject(TYPES.MentorRepository)
		private readonly _mentorRepository: IMentorRepository,
	) {}
	async execute(dto: publicListMentorDto): Promise<IMentorListOutputDto> {
		const finalDTO = {
			...dto,
			isVerified: true,
			status: MentorStatus.ACTIVE,
		};

		const records = await this._mentorRepository.findAllWithCursor(finalDTO);

		return MentorListMapper.toPaginatedResponse(records);
	}
}
