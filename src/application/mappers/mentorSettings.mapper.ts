import type { Mentor, MentorStatus } from "@domain/mentor/mentor.entity";
import type { MentorBookingRuleVO } from "@domain/mentor/value_object/mentor.bookingRules.vo";

export interface ISettingOutputDTO {
	status: MentorStatus;
	BookingRules: {
		leadTimeHours: number;
		futureLimitDays: number;
		maxSessionsDaily: number;
		bufferTimeMinutes: number;
		cancellationCutoffHours: number;
	};
}

export class SettingsMapper {
	static toOutput(data: {
		mentor: Mentor;
		BookingRules: MentorBookingRuleVO;
	}): ISettingOutputDTO {
		return {
			status: data.mentor.status,
			BookingRules: {
				bufferTimeMinutes: data.BookingRules.bufferTimeMinutes,
				cancellationCutoffHours: data.BookingRules.cancellationCutoffHours,
				futureLimitDays: data.BookingRules.futureLimitDays,
				leadTimeHours: data.BookingRules.leadTimeHours,
				maxSessionsDaily: data.BookingRules.maxSessionsDaily,
			},
		};
	}
}
