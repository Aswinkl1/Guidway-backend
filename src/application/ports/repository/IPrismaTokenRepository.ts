export interface Token {
	token: string;
	userId: string;
	userAgent?: string;
	expiresAt: Date;
}

export interface IPrismaRepository {
	create(data: Token): Promise<{ token: string }>;
	findByToken(token: string): Promise<Token | null>;
}
