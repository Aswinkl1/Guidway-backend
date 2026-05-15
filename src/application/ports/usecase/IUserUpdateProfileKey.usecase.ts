export interface IUserUpdateProfileKeyUsecase {
	execute(userId: string, imageKey: string): Promise<void>;
}
