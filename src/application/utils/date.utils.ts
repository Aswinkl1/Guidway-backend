import type { DayOfWeek } from "@domain/mentor/entities/availability.entity";
import { addMinutes } from "date-fns";

const DAYS: DayOfWeek[] = [
	"SUNDAY",
	"MONDAY",
	"TUESDAY",
	"WEDNESDAY",
	"THURSDAY",
	"FRIDAY",
	"SATURDAY",
];

export function getDayOfWeek(date: Date): DayOfWeek {
	return DAYS[date.getDay()];
}

export const createDateTime = (date: Date, minutes: number): Date => {
	// Parses the date string exactly as it is
	// const midnightDate = parseISO(`${dateString}T00:00:00`);

	return addMinutes(date, minutes);
};
