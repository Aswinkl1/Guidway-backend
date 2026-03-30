export interface IBaseRepository<DomainEntity> {
	findById(id: string): Promise<DomainEntity | null>;
}
