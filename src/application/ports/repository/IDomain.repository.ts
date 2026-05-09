import type { GetDomainQueryDto } from "@application/dto/mentor/domain.dto";
import type { Domain } from "@domain/mentor/entities/domain.entity";
import type { IBaseRepository } from "./IBaseRepository";

export interface IDomainRepository
	extends IBaseRepository<Domain, Partial<Domain>, Partial<Domain>> {
	findAll(filter: GetDomainQueryDto): Promise<Domain[] | []>;
}
