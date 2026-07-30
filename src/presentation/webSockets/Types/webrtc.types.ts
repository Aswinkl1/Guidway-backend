export type signalingMessagePaylod = {
	bookingId: string;
	message: {
		type: string;
		data: string;
	};
};
