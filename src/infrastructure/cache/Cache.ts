import type { ICacheService } from "@application/ports/cache/ICache";
import { TYPES } from "@config/DI-container/TYPES";
import { inject, injectable } from "inversify";
import type { RedisClientType } from "redis";

@injectable()
export class CacheService implements ICacheService {
	constructor(@inject(TYPES.RedisClient) private _client: RedisClientType) {}
	async get(key: string): Promise<string | null> {
		const res = await this._client.get(key);
		return res ?? null;
	}
	async set(config: {
		key: string;
		value: string;
		ttlInSeconds: number;
	}): Promise<void> {
		await this._client.setEx(config.key, config.ttlInSeconds, config.value);
	}
	async delete(key: string): Promise<void> {
		await this._client.del(key);
	}
}
