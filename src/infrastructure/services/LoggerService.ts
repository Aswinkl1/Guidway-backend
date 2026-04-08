// src/infrastructure/logger/winston.logger.ts
import type { ILogger } from "@application/ports/services/ILoggerService";
import winston from "winston";

export class WinstonLogger implements ILogger {
	private logger: winston.Logger;

	constructor() {
		this.logger = winston.createLogger({
			level: "info",
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.errors({ stack: true }),
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
		});
	}

	info(message: string, meta?: object) {
		this.logger.info(message, meta);
	}
	warn(message: string, meta?: object) {
		this.logger.warn(message, meta);
	}
	error(message: string, meta?: object) {
		this.logger.error(message, meta);
	}
	debug(message: string, meta?: object) {
		this.logger.debug(message, meta);
	}
}
