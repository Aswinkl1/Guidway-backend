export interface IS3Service {
  getPresignedUploadUrl(fileKey: string, fileType: string): Promise<string>;
}
