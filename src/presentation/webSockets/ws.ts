import type { Server as httpServer } from "node:http";
import type { ITokenService } from "@application/ports/services/ITokenService";
import { container } from "@config/DI-container/container";
import { TYPES } from "@config/DI-container/TYPES";
import { NotFoundError } from "@domain/errors/UserError";

import { Server, type Socket } from "socket.io";
import { WebrtcEvent } from "./events/webrtcEvent";

const tokenService = container.get<ITokenService>(TYPES.TokenService);

export const initSocket = (server: httpServer) => {
	const io = new Server(server, {
		cors: {
			origin: "http://localhost:5173",
			credentials: true,
		},
	});

	io.on("connection", async (socket: Socket) => {
		// chage this to a separate middleware
		const accessToken = await socket.handshake.auth.token;
		if (!accessToken) {
			throw new NotFoundError("access token not found");
		}
		const payload = tokenService.verifyAccessToken(accessToken);
		socket.data = payload;

		new WebrtcEvent(socket);

		// Handle disconnections
		socket.on("disconnect", () => {
			console.log("🔴 User disconnected:", socket.id);
		});
	});
};
