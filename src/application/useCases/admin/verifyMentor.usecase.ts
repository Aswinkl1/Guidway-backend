import type IVerifyMentorUsecase from "@application/ports/usecase/admin/IVerifyMentor.usecase";

export default class VerifyMentorUsecase implements IVerifyMentorUsecase {
	// constructor(){}
	async execute(mentorId: string): Promise<void> {
		return;
	}
}
