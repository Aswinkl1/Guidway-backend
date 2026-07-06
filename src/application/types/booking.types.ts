import type { BookingStatus } from "@domain/booking/booking.entity";
import type { BookingIntent } from "@domain/booking/entities/bookingIntent.entity";
import type { Slot } from "@domain/booking/entities/slot.entity";
import type { Session } from "@domain/session/session.entitiy";

export type BookingSetupDetailsOutput = {
	mentor: {
		id: string;
		name: string;
		avatarUrl?: string;
	};
	session: {
		id: string;
		title: string;
		duration: number;
		price: number;
	};
};

export interface BookingIntentAggregate {
	bookingIntent: BookingIntent;
	slot: Slot;
	session: Session;
}

export interface BookingTransactionData {
	bookingIntent: {
		price: number;
		currency: string;
	};
	slot: {
		startTime: Date;
		endTime: Date; // Strictly forced to Date
		mentorId: string;
		lockedBy: string; // The user ID of the mentee booking the session
	};
	session: {
		name: string; // Used for the sessionTitle
	};
}

export interface MenteeBookingDetailsOutput {
	sessionTitle: string;
	duration: string;
	startDateTime: Date;
	endDateTime: Date;
	user: {
		name: string;
		profileImageKey: string | null;
	};
	note: string | null;
	userId: string;
	mentorId: string;
	amount: number;
	currency: string;
	status: BookingStatus;
	id: string;
}

export interface BookingDetailsRepoOutput {
	id: string;
	amount: number;
	currency: string;
	startTime: Date;
	endTime: Date;
	status: BookingStatus;
	sessionId: string;
	sessionTitle: string;
	note: string | null;
	mentorId: string;
	userId: string;
	mentor: {
		name: string;
		profileImageKey: string | null;
	};
	user: {
		name: string;
		profileImageKey: string | null;
	};
}
