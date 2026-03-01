export interface IVerifyEmailUsecase {
  execute(dto: string): Promise<{ message: string }>;
}
