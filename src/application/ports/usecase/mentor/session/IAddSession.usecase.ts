import type { CreateSessionDTO } from "@application/dto/mentor/session.dto";
import type { SessionOutputDTO } from "@application/mappers/session.mapper";

export interface IAddSessionUsecase {
	execute(mentorId: string, dto: CreateSessionDTO): Promise<SessionOutputDTO>;
}
