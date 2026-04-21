export interface IBaseRepository<DomainEntity, CreateInput, UpdateInput> {
	findById(id: string): Promise<DomainEntity | null>;
	create(data: DomainEntity): Promise<DomainEntity>;
}
