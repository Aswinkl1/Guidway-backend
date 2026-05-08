import type {
	MentorLanguageDTO,
	MentorLanguageOutputDTO,
} from "@application/dto/mentor/mentorLanguage.dto";

export interface IAddMentorLanguageUsecase {
	execute(
		mentorId: string,
		dto: MentorLanguageDTO,
	): Promise<MentorLanguageOutputDTO>;
}
