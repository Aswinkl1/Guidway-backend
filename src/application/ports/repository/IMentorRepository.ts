import type { Mentor } from "@domain/mentor/mentor.entity";

export interface IMentorRepository {
  create(data: Partial<Mentor>): Mentor;
}
