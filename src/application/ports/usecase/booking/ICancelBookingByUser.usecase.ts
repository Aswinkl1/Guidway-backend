export interface ICancelBookingByUserUsecase {
	execute(userId: string, bookingId: string): Promise<void>;
}
