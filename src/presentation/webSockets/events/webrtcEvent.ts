import { container } from "@config/DI-container/container";
import { TYPES } from "@config/DI-container/TYPES";
import type { Socket } from "socket.io";
import type { IWebRtcHandler } from "../handler/wetrtcHandler";
import type { signalingMessagePaylod } from "../Types/webrtc.types";

export class WebrtcEvent {
	private handler: IWebRtcHandler;
	constructor(private socket: Socket) {
		this.handler = container.get<IWebRtcHandler>(TYPES.WebrtcHandler);
	}

	register() {
		this.socket.on("user-joined", async (bookingId: string) => {
			await this.handler.handleUserJoin(this.socket, bookingId);
		});

		this.socket.on(
			"signaling-message",
			async (data: signalingMessagePaylod) => {
				await this.handler.handleSignalling(this.socket, data);
			},
		);
	}
}
