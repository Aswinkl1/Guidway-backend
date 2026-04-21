export interface ICacheService {
	get(key: string): Promise<string | null>;
	set(config: {
		key: string;
		value: string;
		ttlInSeconds: number;
	}): Promise<void>;
	delete(key: string): Promise<void>;
}
