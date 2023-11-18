import 'dotenv/config';

import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import compression from 'compression';

import routes from './routes';

import notFound from './middlewares/404.middleware';
import morgan from './middlewares/morgan.middleware';
import response from './middlewares/response.middleware';
import errorHandler from './middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(morgan());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(response);

app.use('/v1/api', routes);

app.use(notFound);
app.use(errorHandler);

export default app;
