import { PROFICIENCY_LEVEL } from "@domain/mentor/value_object/mentor.language.vo";
import z from "zod";

export const MentorLanguageSchema = z.object({
	languageId: z.uuid(),
	proficiency: z.enum([
		PROFICIENCY_LEVEL.NATIVE,
		PROFICIENCY_LEVEL.FLUENT,
		PROFICIENCY_LEVEL.CONVERSATIONAL,
		PROFICIENCY_LEVEL.BASIC,
	]),
});

export type MentorLanguageDTO = z.infer<typeof MentorLanguageSchema>;

export const DeleteMentorLanguageSchema = MentorLanguageSchema.omit({
	proficiency: true,
});

export type DeleteMentorLanguageDTO = z.infer<
	typeof DeleteMentorLanguageSchema
>;

export interface MentorLanguageOutputDTO {
	languageId: string;
	name: string;
	proficiency: string;
}
