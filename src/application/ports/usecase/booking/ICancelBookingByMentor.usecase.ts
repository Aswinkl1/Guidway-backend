export interface ICancelBookingByMentorUsecase {
	execute(mentorId: string, bookingId: string): Promise<void>;
}
