import type { Domain } from "@domain/mentor/entities/domain.entity";

export interface IDomainOutputDTO {
	id: string;
	domainName: string;
}

export class DomainMapper {
	static(entity: Domain): IDomainOutputDTO {
		return {
			id: entity.id,
			domainName: entity.domainName,
		};
	}
}
