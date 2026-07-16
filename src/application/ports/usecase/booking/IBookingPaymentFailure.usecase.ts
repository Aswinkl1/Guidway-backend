export interface IBookingPaymentFailureUsecase {
	execute(usersId: string, slotId: string): Promise<void>;
}
