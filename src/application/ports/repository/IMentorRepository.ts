import type { Mentor } from "@domain/entities/mentor/mentor.entity";

export interface IMentorRepository {
	create(data: Partial<Mentor>): Mentor;
}
