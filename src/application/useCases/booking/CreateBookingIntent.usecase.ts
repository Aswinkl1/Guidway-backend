import type { HoldSlotDto } from "@application/dto/booking/slotHold.dto";
import type { IAvailabilityRepository } from "@application/ports/repository/IAvailability.repository";
import type { ISlotRepository } from "@application/ports/repository/ISlot.repository";
import type { IPaymentService } from "@application/ports/services/IPaymentService";
import type { ICreateBookingIntentUsecase } from "@application/ports/usecase/booking/ICreateBookingIntent.usecase";
import type { CreateOrderResponse } from "@application/types/PaymentService.types";
import { TYPES } from "@config/DI-container/TYPES";
import { ConflictError } from "@domain/errors/ConflictError";
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
			throw new ConflictError("Mentor is unavailable for the requested time");
		}
		console.log("date", data.date.toLocaleDateString("en-CA"));
		// store the day with same time to avoid issues with data comparison
		const date = new Date(
			`${data.date.toLocaleDateString("en-CA")}T00:00:00.000Z`,
		);

		const order = await this._paymentService.createOrder({
			amount: data.price * 100,
			currency: "INR",
		});
		const finalData = {
			...data,
			date,
			orderId: order.orderId,
			provider: this._paymentService.getPaymentProviderName(),
		};

		const res =
			await this._slotRepository.transactionallySaveSlotAndBookingIntent(
				userId,
				finalData,
			);

		return { ...order, slotId: res.slotId };
	}
}
