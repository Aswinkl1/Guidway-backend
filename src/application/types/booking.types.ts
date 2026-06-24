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
