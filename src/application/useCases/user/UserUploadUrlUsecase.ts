import type { IS3Service } from "@application/ports/services/IS3Service";
import type { IUserUploadUrlUsecase } from "@application/ports/usecase/IUserUploadUrl.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { inject, injectable } from "inversify";
import { v4 as uuid } from "uuid";

@injectable()
export class UserUploadUrlUsecase implements IUserUploadUrlUsecase {
	constructor(
		@inject(TYPES.S3Service) private readonly _s3Service: IS3Service,
	) {}
	execute = async (
		id: string,
		fileType: string,
	): Promise<{ uploadUrl: string; fileKey: string }> => {
		// Validate file type
		const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

		if (!allowedTypes.includes(fileType)) {
			throw new Error("Unsupported file type");
		}

		const fileKey = `user/${id}/${uuid()}`;
		const uploadUrl = await this._s3Service.getPresignedUploadUrl(
			fileKey,
			fileType,
		);

		return { uploadUrl, fileKey };
	};
}
