export interface IVedioCallUsecase {
	execute(userId: string, bookingId: string): Promise<void>;
}
