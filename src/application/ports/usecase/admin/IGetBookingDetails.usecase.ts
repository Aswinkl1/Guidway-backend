export interface IGetAdminBookingDetailsUsecase {
	execute(bookingId: string): Promise<void>;
}
