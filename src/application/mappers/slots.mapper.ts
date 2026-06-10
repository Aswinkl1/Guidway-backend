import type { SlotsVO } from "@domain/booking/slot.vo";

export interface ISlotResponse {
	startTime: number;
	endTime: number;
	isAvailable: boolean;
}
export class SlotsMapper {
	static toResponse(vo: SlotsVO[]): ISlotResponse[] {
		return vo.map((v) => {
			return {
				startTime: v.props.startTime,
				endTime: v.props.endTime,
				isAvailable: v.props.isAvailable,
			};
		});
	}
}
