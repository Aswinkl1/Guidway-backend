import type { IS3Service } from "@application/ports/services/IS3Service";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { EnvConfig } from "@config/env";
import { injectable } from "inversify";

const s3 = new S3Client({ region: EnvConfig.AWS_REGION });

injectable();
export class S3Service implements IS3Service {
	getPresignedUploadUrl = async (
		fileKey: string,
		fileType: string,
	): Promise<string> => {
		const command = new PutObjectCommand({
			Bucket: EnvConfig.S3_BUCKET_NAME,
			Key: fileKey,
			ContentType: fileType,
		});
		const url = await getSignedUrl(s3, command, {
			expiresIn: EnvConfig.AWS_S3_EXPIRES_IN,
		}); // URL valid for 5 minutes
		return url;
	};
}
