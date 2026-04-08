import { DOMAIN_ERRORS_MESSAGE } from "@domain/constant/messages";

export interface UserProps {
	id: string;
	email: string;
	name: string;
	password: string | null;
	phoneNumber: string | null;
	profileImageKey: string | null;
	authProviderId: string | null;
	role: Role;
	isDeleted: boolean;
	isVerified: boolean;
	isBlocked: boolean;
	timezone: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export class User {
	public id: string;
	public email: string;
	public name: string;
	public password: string | null;
	public phoneNumber: string | null;
	public profileImageKey: string | null;
	public authProviderId: string | null;
	public role: Role;
	public isDeleted: boolean;
	public isVerified: boolean;
	public isBlocked: boolean;
	public timezone: string | null;
	public createdAt: Date;
	public updatedAt: Date;

	constructor(public data: UserProps) {
		this.id = data.id;
		this.email = data.email;
		this.name = data.name;
		this.password = data.password;
		this.phoneNumber = data.phoneNumber ?? null;
		this.profileImageKey = data.profileImageKey;
		this.authProviderId = data.authProviderId;
		this.role = data.role;
		this.isDeleted = data.isDeleted ?? false;
		this.isVerified = data.isVerified ?? false;
		this.isBlocked = data.isBlocked ?? false;

		this.timezone = data.timezone;
		this.createdAt = data.createdAt;
		this.updatedAt = data.updatedAt;
	}

	block() {
		if (this.role === Role.ADMIN)
			throw Error(DOMAIN_ERRORS_MESSAGE.USER.ADMIN_BLOCK_RESTRICTED);
		if (this.isBlocked)
			throw new Error(DOMAIN_ERRORS_MESSAGE.USER.ALREADY_BLOCKED);
		this.isBlocked = true;
	}

	unBlock() {
		if (!this.isBlocked)
			throw new Error(DOMAIN_ERRORS_MESSAGE.USER.NOT_BLOCKED);
		this.isBlocked = false;
	}
}

export const Role = {
	ADMIN: "admin",
	MENTOR: "mentor",
	MENTEE: "mentee",
} as const;

export type Role = (typeof Role)[keyof typeof Role];
