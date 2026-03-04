import { IRefreshTokenUsecase } from "@application/ports/usecase/IRefreshToken.usecase";

export class RefreshTokenUsecase implements IRefreshTokenUsecase {
  execute(token: string): Promise<{ accessToken: string }> {
    throw new Error("Method not implemented.");
  }
}
