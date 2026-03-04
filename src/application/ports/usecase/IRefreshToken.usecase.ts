export interface IRefreshTokenUsecase {
  execute(token: string): Promise<{ accessToken: string }>;
}
