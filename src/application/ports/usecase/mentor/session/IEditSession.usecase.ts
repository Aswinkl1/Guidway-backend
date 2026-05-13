import type { editSessionDTO } from "@application/dto/mentor/session.dto";
import type { SessionOutputDTO } from "@application/mappers/session.mapper";

export interface IEditSessionUsecase {
	execute(mentorId: string, dto: editSessionDTO): Promise<SessionOutputDTO>;
}
