import { ForbiddenError } from "@application/errors/ForbidenError";
import type { ISlotRepository } from "@application/ports/repository/ISlot.repository";
import type { IBookingPaymentFailureUsecase } from "@application/ports/usecase/booking/IBookingPaymentFailure.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { NotFoundError } from "@domain/errors/UserError";
import { inject, injectable } from "inversify";

@injectable()
export class BookingPaymentFailureUsecase
	implements IBookingPaymentFailureUsecase
{
	constructor(
		@inject(TYPES.SlotRepository)
		private readonly _slotRepository: ISlotRepository,
	) {}

	async execute(userId: string, slotId: string): Promise<void> {
		const slot = await this._slotRepository.findById(slotId);

		if (!slot) {
			throw new NotFoundError("slot not found");
		}

		if (slot.lockedBy !== userId) {
			throw new ForbiddenError("you dont have access to modily this ");
		}

		await this._slotRepository.handlePaymentFailure(slotId);
	}
}
