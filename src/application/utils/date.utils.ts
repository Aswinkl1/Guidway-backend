import type { DayOfWeek } from "@domain/mentor/entities/availability.entity";

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
