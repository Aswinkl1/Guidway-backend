import winston from "winston";

const isProduction = process.env.NODE_ENV === "production";

export const logger = isProduction
	? winston.createLogger({
			level: "info",
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.json(),
			),
			transports: [
				new winston.transports.Console(),
				new winston.transports.File({
					filename: "logs/error.log",
					level: "error",
				}),
				new winston.transports.File({ filename: "logs/combined.log" }),
			],
		})
	: {
			info: (msg: string, meta?: object) =>
				console.log("[INFO]", msg, meta ?? ""),
			warn: (msg: string, meta?: object) =>
				console.warn("[WARN]", msg, meta ?? ""),
			error: (msg: string, meta?: object) =>
				console.error("[ERROR]", msg, meta ?? ""),
			debug: (msg: string, meta?: object) =>
				console.debug("[DEBUG]", msg, meta ?? ""),
		};
