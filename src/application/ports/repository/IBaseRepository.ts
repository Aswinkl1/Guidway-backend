export interface IBaseRepository<DomainEntity, _CreateInput, _UpdateInput> {
	findById(id: string): Promise<DomainEntity | null>;
	create(data: DomainEntity): Promise<DomainEntity>;
	save(id: string, data: Partial<DomainEntity>): Promise<DomainEntity>;
	findByMentorId(id: string): Promise<DomainEntity>;
}
