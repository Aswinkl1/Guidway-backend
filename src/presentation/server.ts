import express from "express";
import cors from "cors";
import helmet from "helmet";
import route from "./routes";
import { errorHandler } from "./middleware/errorHandler";
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/v1", route);

app.use(errorHandler);
export default app;
