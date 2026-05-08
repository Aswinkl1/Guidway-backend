import type { MentorLanguageVO } from "@domain/mentor/value_object/mentor.language.vo";

export interface IMentorLanguageRepository {
	upsert(vo: MentorLanguageVO): Promise<MentorLanguageVO>;
	remove(mentorId: string, languageId: string): Promise<void>;
}
