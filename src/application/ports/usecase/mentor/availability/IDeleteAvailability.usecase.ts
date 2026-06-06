export interface IDeleteAvailabilityUsecase {
	execute(mentorId: string, availabilityId: string): Promise<void>;
}
