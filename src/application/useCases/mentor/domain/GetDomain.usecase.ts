import type { GetDomainQueryDto } from "@application/dto/mentor/domain.dto";
import {
	DomainMapper,
	type IDomainOutputDTO,
} from "@application/mappers/domain.mapper";
import type { IDomainRepository } from "@application/ports/repository/IDomain.repository";
import type { IGetDomainUsecase } from "@application/ports/usecase/mentor/Domian/IGetDomain.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { inject, injectable } from "inversify";

@injectable()
export class GetDomainUsecase implements IGetDomainUsecase {
	constructor(
		@inject(TYPES.DomainRepository)
		private readonly _domainRepository: IDomainRepository,
	) {}

	async execute(filter: GetDomainQueryDto): Promise<IDomainOutputDTO[]> {
		const record = await this._domainRepository.findAll(filter);

		return record.map((d) => DomainMapper.toOutput(d));
	}
}
