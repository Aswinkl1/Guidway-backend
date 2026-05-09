import type { GetDomainQueryDto } from "@application/dto/mentor/domain.dto";
import type { IDomainOutputDTO } from "@application/mappers/domain.mapper";

export interface IGetDomainUsecase {
	execute(filter: GetDomainQueryDto): Promise<IDomainOutputDTO[]>;
}
