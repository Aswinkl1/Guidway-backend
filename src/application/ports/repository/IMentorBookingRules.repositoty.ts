import type { MentorBookingRuleVO } from "@domain/mentor/value_object/mentor.bookingRules.vo";

export interface IMentorBookingRulesRepository {
	findByUserId(userId: string): Promise<MentorBookingRuleVO | null>;
	upsert(rules: MentorBookingRuleVO): Promise<MentorBookingRuleVO>;
}
