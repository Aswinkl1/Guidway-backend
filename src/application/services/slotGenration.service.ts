import { SlotsVO } from "@domain/booking/slot.vo";

export class SlotGenerationService {
	static generate(
		availabilityRules: { startTime: number; endTime: number }[],
		sessionDuration: number,
		bookedSlots: { startTime: number; endTime: number }[],
	) {
		const slots: SlotsVO[] = [];

		for (const availabilityRule of availabilityRules) {
			let curTime = availabilityRule.startTime;
			while (curTime + sessionDuration <= availabilityRule.endTime) {
				const nextTime = curTime + sessionDuration;
				const isBooked = bookedSlots.some(
					(booked) => curTime < booked.endTime && nextTime > booked.startTime,
				);
				const slot: SlotsVO = SlotsVO.create({
					startTime: curTime,
					endTime: curTime + sessionDuration,
					isAvailable: !isBooked,
				});

				curTime += sessionDuration;
				slots.push(slot);
			}
		}

		return slots;
	}
}
