interface TimePeriodProps {
	startMonth: number;
	startYear: number;
	endMonth: number | null;
	endYear: number | null;
	isCurrent: boolean;
}

export class TimePeriod {
	private constructor(public readonly props: TimePeriodProps) {}

	static create(props: TimePeriodProps) {
		const currentYear = new Date().getFullYear();

		if (props.startYear > currentYear) {
			throw Error("Start year cannot be in the future");
		}

		if (props.endYear !== null && props.endYear < props.startYear) {
			throw new Error("End year cannot be before start year");
		}

		if (props.isCurrent && props.endYear !== null) {
			throw new Error("Current education cannot have an end date");
		}

		return new TimePeriod(props);
	}
}
