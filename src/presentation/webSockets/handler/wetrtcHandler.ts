import type { IVedioCallUsecase } from "@application/ports/usecase/booking/IVedioCall.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { inject, injectable } from "inversify";
import type { Socket } from "socket.io";
import { WEBRTC_EVENTS } from "../constants/webrtc.constants";
import type { signalingMessagePaylod } from "../Types/webrtc.types";
@injectable()
export class WebrtcHandler implements IWebRtcHandler {
	constructor(
		@inject(TYPES.VedioCallUsecase)
		private readonly _vediocallUsecase: IVedioCallUsecase,
	) {}
	handleUserJoin = async (socket: Socket, bookingId: string) => {
		const { userId } = socket.data;
		await this._vediocallUsecase.execute(userId, bookingId);
		socket.join(bookingId);
		socket.to(bookingId).emit(WEBRTC_EVENTS.USER_JOINED);
	};
	handleSignalling = async (
		socket: Socket,
		data: signalingMessagePaylod,
	): Promise<void> => {
		socket
			.to(data.bookingId)
			.emit(WEBRTC_EVENTS.SIGNALING_MESSAGE, data.message);
	};
}

export interface IWebRtcHandler {
	handleUserJoin(socket: Socket, bookingId: string): Promise<void>;
	handleSignalling(socket: Socket, data: signalingMessagePaylod): Promise<void>;
}
