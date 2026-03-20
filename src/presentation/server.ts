import { EnvConfig } from "@config/env";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler";
import route from "./routes";

const app = express();

app.use(
	cors({
		origin: "http://localhost:5173", // Must be your exact Vite URL (no trailing slash)
		credentials: true,
	}),
);

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(`/${EnvConfig.API_VERSION}`, route);

app.use(errorHandler);
export default app;
