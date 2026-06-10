import { SlotsVO } from "@domain/booking/slot.vo";

export class SlotGenerationService {
	static generate(
		availabilityRules: { startTime: number; endTime: number }[],
		sessionDuration: number,
	) {
		const slots: SlotsVO[] = [];

		for (const availabilityRule of availabilityRules) {
			let curTime = availabilityRule.startTime;

			while (curTime + sessionDuration <= availabilityRule.endTime) {
				const slot: SlotsVO = SlotsVO.create({
					startTime: curTime,
					endTime: curTime + sessionDuration,
					isAvailable: true,
				});

				curTime += sessionDuration;
				slots.push(slot);
			}
		}

		return slots;
	}
}
