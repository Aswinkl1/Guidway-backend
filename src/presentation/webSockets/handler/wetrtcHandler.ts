import type { IVedioCallUsecase } from "@application/ports/usecase/booking/IVedioCall.usecase";
import type { Socket } from "socket.io";

export class WebrtcHandler implements IWebRtcHandler {
	constructor(private readonly _vediocallUsecase: IVedioCallUsecase) {}
	handleUserJoin = async (socket: Socket, bookingId: string) => {
		const { userId } = socket.data;
		await this._vediocallUsecase.execute(userId, bookingId);
		socket.join(bookingId);
		socket.to(bookingId).emit("user-joined");
	};
}

export interface IWebRtcHandler {
	handleUserJoin(socket: Socket, bookingId: string): Promise<void>;
}
