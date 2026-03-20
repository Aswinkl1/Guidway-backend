import type { IPrismaRepository } from "@application/ports/repository/IPrismaTokenRepository";
import { TYPES } from "@config/DI-container/TYPES";
import type { PrismaClient } from "generated/prisma/client";
import { inject, injectable } from "inversify";

@injectable()
export class PrismaTokenRespository implements IPrismaRepository {
	constructor(
		@inject(TYPES.PrismaClient) private readonly _prisma: PrismaClient,
	) {}
	async findByToken(token: string): Promise<{
		token: string;
		userId: string;
		userAgent?: string;
		expiresAt: Date;
	} | null> {
		const record = await this._prisma.refreshToken.findUnique({
			where: {
				token,
			},
		});

		return record;
	}
	create = async (data: {
		token: string;
		userId: string;
		userAgent: string;
		expiresAt: Date;
		lastUsed: Date;
	}): Promise<{ token: string }> => {
		// create the record
		const record = await this._prisma.refreshToken.create({
			data,
			select: {
				token: true,
			},
		});

		//TODO:  create and errity and map this to it

		// return the token
		return record;
	};
}
