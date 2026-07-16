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

	// return addMinutes(date, minutes);
	// 1. Extract the raw calendar components (ignoring any UTC offsets)
	const year = date.getFullYear();
	const month = date.getMonth(); // Note: Month is 0-indexed in JS
	const day = date.getDate();

	// 2. Construct a strict LOCAL midnight Date object
	// Passing individual numbers forces the browser to use your local IST timezone
	const localMidnight = new Date(year, month, day, 0, 0, 0);

	// 3. Add the slot minutes to the local midnight
	return addMinutes(localMidnight, minutes);
};

export const toUTCMidnight = (date: Date): Date => {
	if (!date || Number.isNaN(date.getTime())) {
		throw new Error("Invalid Date provided to toUTCMidnightSafe");
	}

	const year = date.getFullYear();
	// getMonth() is zero-indexed, so we add 1. padStart ensures "07" instead of "7".
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	return new Date(`${year}-${month}-${day}T00:00:00.000Z`);
};
