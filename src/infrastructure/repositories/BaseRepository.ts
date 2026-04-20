import type { IBaseRepository } from "@application/ports/repository/IBaseRepository";
import { injectable } from "inversify";

@injectable()
export abstract class BaseRepository<
	DbModel,
	DomainEntity,
	CreateInput,
	UpdateInput = Partial<CreateInput>,
> implements IBaseRepository<DomainEntity, CreateInput, UpdateInput>
{
	// biome-ignore lint/suspicious/noExplicitAny: <we did it so >
	constructor(protected readonly prismaDelegate: any) {}

	// The strict rule: Every child repo MUST provide this mapper
	protected abstract toDomain(record: DbModel): DomainEntity;
	protected abstract toPersistence(
		userEntity: DomainEntity,
	): Omit<CreateInput, "createdAt" | "updatedAt">;
	async findById(id: string): Promise<DomainEntity | null> {
		const record = await this.prismaDelegate.findUnique({
			where: { id },
		});
		if (!record) return null;

		return this.toDomain(record);
	}

	create = async (data: DomainEntity) => {
		const persisence = this.toPersistence(data);
		const record = await this.prismaDelegate.create({ data: persisence });

		return this.toDomain(record);
	};
}
