import type {
	Availability,
	DayOfWeek,
} from "@domain/mentor/entities/availability.entity";

export interface ITimeSlot {
	id: string;
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

				acc[day].push({
					id: cur.id,
					startTime: cur.startTime,
					endTime: cur.endTime,
				});
				return acc;
			},
			{} as Record<DayOfWeek, ITimeSlot[]>,
		);

		return record;
	}
}
