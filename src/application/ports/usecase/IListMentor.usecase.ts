import type { publicListMentorDto } from "@application/dto/mentor/listMentor.dto";
import type { IMentorListOutputDto } from "@application/mappers/menot-list.mapper";

export interface IListMentorsUsecase {
	execute(dto: publicListMentorDto): Promise<IMentorListOutputDto>;
}
