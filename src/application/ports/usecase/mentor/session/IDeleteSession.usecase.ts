import type { DeleteSessionDTO } from "@application/dto/mentor/session.dto";

export interface IDeleteSessionUsecase {
	execute(dto: DeleteSessionDTO): Promise<void>;
}
