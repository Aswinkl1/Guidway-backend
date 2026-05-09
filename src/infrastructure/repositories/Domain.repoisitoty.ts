import type { GetDomainQueryDto } from "@application/dto/mentor/domain.dto";
import type { IDomainRepository } from "@application/ports/repository/IDomain.repository";
import { TYPES } from "@config/DI-container/TYPES";
import { Domain } from "@domain/mentor/entities/domain.entity";
import type {
	Prisma,
	PrismaClient,
	Domain as PrismaDomain,
} from "generated/prisma/client";
import { inject, injectable } from "inversify";
import { BaseRepository } from "./BaseRepository";

@injectable()
export class DomainRepository
	extends BaseRepository<
		PrismaDomain,
		Domain,
		Prisma.DomainCreateInput,
		Prisma.DomainUpdateInput
	>
	implements IDomainRepository
{
	constructor(@inject(TYPES.PrismaClient) private _prisma: PrismaClient) {
		super(_prisma.language);
	}
	protected toDomain(record: {
		id: string;
		domainName: string;
		createdAt: Date;
		updatedAt: Date;
	}): Domain {
		return Domain.create(record);
	}
	protected toPersistence(
		entity: Domain,
	): Omit<Prisma.DomainCreateInput, "createdAt" | "updatedAt"> {
		return {
			id: entity.id,
			domainName: entity.domainName,
		};
	}
	async findAll(filter: GetDomainQueryDto): Promise<Domain[] | []> {
		const record = await this._prisma.domain.findMany({
			where: filter.search
				? {
						domainName: {
							contains: filter.search,
							mode: "insensitive",
						},
					}
				: undefined,
		});

		return record.map((d) => this.toDomain(d));
	}
}
