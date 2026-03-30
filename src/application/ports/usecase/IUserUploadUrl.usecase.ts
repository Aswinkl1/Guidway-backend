export interface IUserUploadUrlUsecase {
  execute: (
    id: string,
    fileType: string,
  ) => Promise<{ uploadUrl: string; fileKey: string }>;
}
