export interface ITokenCache {
	saveToken(
		token: string,
		data: string,
		expiresInSecond: number,
	): Promise<void>;
	getUserIdByToken(token: string): Promise<string | null>;
	deleteToken(token: string): Promise<void>;
}
