import type { Session } from "@domain/session/session.entitiy";
import type { IBaseRepository } from "./IBaseRepository";

export interface ISessionRepository
	extends IBaseRepository<Session, Partial<Session>, Partial<Session>> {}
