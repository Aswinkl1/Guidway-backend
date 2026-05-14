import type { Session } from "@domain/session/session.entitiy";

export interface SessionOutputDTO {
	id: string;
	name: string;
	mentorId: string;
	duration: number;
	description: string;
	isActive: boolean;
	deletedAt?: Date | null;
	createdAt: Date;
	updatedAt: Date;
	price: number;
}

export class SessionMapper {
	static toOutput(data: Session): SessionOutputDTO {
		return {
			id: data.id,
			name: data.name,
			mentorId: data.mentorId,
			description: data.description,
			duration: data.duration,
			isActive: data.isActive,
			createdAt: data.createdAt,
			updatedAt: data.updatedAt,
			deletedAt: data.deletedAt,
			price: data.price,
		};
	}
}
