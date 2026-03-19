import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import route from './routes';
import { errorHandler } from './middleware/errorHandler';
import cookieParser from 'cookie-parser';
import { EnvConfig } from '@config/env';
import morgan from 'morgan';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173', // Must be your exact Vite URL (no trailing slash)
    credentials: true,
  }),
);

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(`/${EnvConfig.API_VERSION}`, route);

app.use(errorHandler);
export default app;
