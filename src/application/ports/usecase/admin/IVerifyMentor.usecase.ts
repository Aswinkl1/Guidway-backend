export default interface IVerifyMentorUsecase {
	execute(mentorId: string): Promise<void>;
}
