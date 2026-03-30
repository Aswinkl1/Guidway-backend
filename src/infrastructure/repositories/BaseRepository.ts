import { injectable } from "inversify";

@injectable()
export abstract class BaseRepository<DbModel, DomainEntity> {
  // biome-ignore lint/suspicious/noExplicitAny: <we did it so >
  constructor(protected readonly prismaDelegate: any) {}

  // The strict rule: Every child repo MUST provide this mapper
  protected abstract toDomain(record: DbModel): DomainEntity;

  async findById(id: string): Promise<DomainEntity | null> {
    const record = await this.prismaDelegate.findUnique({
      where: { id },
    });
    if (!record) return null;

    return this.toDomain(record);
  }
}
