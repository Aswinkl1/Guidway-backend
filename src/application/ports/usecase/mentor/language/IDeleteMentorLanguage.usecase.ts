import type { DeleteMentorLanguageDTO } from "@application/dto/mentor/mentorLanguage.dto";

export interface IDeleteMentorLanguageUsecase {
	execute(mentorId: string, dto: DeleteMentorLanguageDTO): Promise<void>;
}
