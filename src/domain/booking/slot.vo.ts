interface ISlotsProps {
	startTime: number;
	endTime: number;
	isAvailable: boolean;
}

export class SlotsVO {
	private constructor(public readonly props: ISlotsProps) {}

	static create(props: ISlotsProps) {
		return new SlotsVO(props);
	}
}
