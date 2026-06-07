import type {
	Availability,
	DayOfWeek,
} from "@domain/mentor/entities/availability.entity";

export interface ITimeSlot {
	id: string;
	startTime: number;
	endTime: number;
}

// export type GetAvailabilityPayload = Partial<Record<DayOfWeek, ITimeSlot[]>>;
export interface GetAvailabilityPayload {
	dayOfWeek: DayOfWeek;
	slots: ITimeSlot[];
	isActive: boolean;
}
export class AvailabilityMapper {
	static toResponse(data: Availability[]): GetAvailabilityPayload[] {
		console.log(data);
		const record = data.reduce(
			(acc, cur) => {
				const day = cur.dayOfWeek;
				if (!acc[day]) {
					acc[day] = {
						dayOfWeek: cur.dayOfWeek,
						isActive: cur.isActive,
						slots: [],
					};
				}

				acc[day].slots.push({
					startTime: cur.startTime,
					endTime: cur.endTime,
					id: cur.id,
				});

				return acc;
			},
			{} as Record<DayOfWeek, GetAvailabilityPayload>,
		);

		return Object.values(record);
	}
}
