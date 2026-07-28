import { container } from "@config/DI-container/container";
import { TYPES } from "@config/DI-container/TYPES";
import type { Socket } from "socket.io";
import { type IWebRtcHandler, WebrtcHandler } from "../handler/wetrtcHandler";

export class WebrtcEvent {
	private handler: IWebRtcHandler;
	constructor(private socket: Socket) {
		this.handler = container.get<IWebRtcHandler>(TYPES.WebrtcHandler);
	}

	register() {
		this.socket.on("user-joined", async (bookingId: string) => {
			await this.handler.handleUserJoin(this.socket, bookingId);
		});
	}
}
