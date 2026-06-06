import type {
	Availability,
	DayOfWeek,
} from "@domain/mentor/entities/availability.entity";

export interface ITimeSlot {
	startTime: number;
	endTime: number;
}

export type GetAvailabilityPayload = Partial<Record<DayOfWeek, ITimeSlot[]>>;

export class AvailabilityMapper {
	static toResponse(data: Availability[]): GetAvailabilityPayload {
		const record = data.reduce(
			(acc, cur) => {
				const day = cur.dayOfWeek;
				if (!acc[day]) {
					acc[day] = [];
				}

				acc[day].push({ startTime: cur.startTime, endTime: cur.endTime });
				return acc;
			},
			{} as Record<DayOfWeek, { startTime: number; endTime: number }[]>,
		);

		return record;
	}
}
