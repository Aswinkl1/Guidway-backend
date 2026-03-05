import express from "express";
import cors from "cors";
import helmet from "helmet";
import route from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
import { EnvConfig } from "@config/env";
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(`/${EnvConfig.API_VERSION}`, route);

app.use(errorHandler);
export default app;
