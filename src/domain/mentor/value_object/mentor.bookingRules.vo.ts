import { NotFoundError } from "@domain/errors/UserError";

interface IMentorBookingRulesProps {
	userId: string;
	leadTimeHours: number;
	futureLimitDays: number;
	maxSessionsDaily: number;
	bufferTimeMinutes: number;
	cancellationCutoffHours: number;
	updatedAt: Date;
}
export class MentorBookingRuleVO {
	private constructor(private readonly props: IMentorBookingRulesProps) {}

	static create(props: IMentorBookingRulesProps) {
		MentorBookingRuleVO.validate(props);

		return new MentorBookingRuleVO(props);
	}

	update(props: Partial<Omit<IMentorBookingRulesProps, "userId">>) {
		const updatedProps = {
			...this.props,
		};

		if (props.bufferTimeMinutes !== undefined) {
			updatedProps.bufferTimeMinutes = props.bufferTimeMinutes;
		}

		if (props.cancellationCutoffHours !== undefined) {
			updatedProps.cancellationCutoffHours = props.cancellationCutoffHours;
		}

		if (props.futureLimitDays !== undefined) {
			updatedProps.futureLimitDays = props.futureLimitDays;
		}

		if (props.leadTimeHours !== undefined) {
			updatedProps.leadTimeHours = props.leadTimeHours;
		}

		if (props.maxSessionsDaily !== undefined) {
			updatedProps.maxSessionsDaily = props.maxSessionsDaily;
		}

		updatedProps.updatedAt = new Date();

		MentorBookingRuleVO.validate(updatedProps);

		return new MentorBookingRuleVO(updatedProps);
	}

	private static validate(props: IMentorBookingRulesProps) {
		if (!props.userId) {
			throw new NotFoundError("userId required");
		}
	}
}
