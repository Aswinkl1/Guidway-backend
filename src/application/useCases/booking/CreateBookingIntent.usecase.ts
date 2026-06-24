import type { HoldSlotDto } from "@application/dto/booking/slotHold.dto";
import type { IAvailabilityRepository } from "@application/ports/repository/IAvailability.repository";
import type { ISlotRepository } from "@application/ports/repository/ISlot.repository";
import type { IPaymentService } from "@application/ports/services/IPaymentService";
import type { ICreateBookingIntentUsecase } from "@application/ports/usecase/booking/ICreateBookingIntent.usecase";
import type { CreateOrderResponse } from "@application/types/PaymentService.types";
import { TYPES } from "@config/DI-container/TYPES";
import { DayOfWeekIndex } from "@domain/mentor/entities/availability.entity";
import { inject, injectable } from "inversify";
@injectable()
export class CreateBookingIntentUsecase implements ICreateBookingIntentUsecase {
	constructor(
		@inject(TYPES.SlotRepository)
		private readonly _slotRepository: ISlotRepository,
		@inject(TYPES.AvailabilityRepository)
		private readonly _availabilityRepository: IAvailabilityRepository,
		@inject(TYPES.PaymentService)
		private readonly _paymentService: IPaymentService,
	) {}

	async execute(
		userId: string,
		data: HoldSlotDto,
	): Promise<CreateOrderResponse> {
		const dayOfWeek = DayOfWeekIndex[new Date(data.date).getDay()];
		const availability = await this._availabilityRepository.checkOverlap(
			data.mentorId,
			dayOfWeek,
			data.startTime,
			data.endTime,
		);

		if (!availability) {
			throw new Error("Requested time slot is not available.");
		}
		const slot = await this._slotRepository.checkOverlap(
			data.mentorId,
			data.date,
			data.startTime,
			data.endTime,
		);

		if (slot) {
			throw new Error("Requested time slot overlaps with an existing booking.");
		}

		const order = await this._paymentService.createOrder({
			amount: data.price * 100,
			currency: "INR",
		});
		const finalData = {
			...data,
			orderId: order.orderId,
			provider: this._paymentService.getPaymentProviderName(),
		};

		await this._slotRepository.transactionallySaveSlotAndBookingIntent(
			userId,
			finalData,
		);

		return order;
	}
}
