import * as dotenv from 'dotenv';

dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import authRoute from './Src/route/auth';
import userRoute from './Src/route/user';
import taskRoute from './Src/route/task';
import swaggerDocument from './swagger.json';

import './Src/database/index';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

app.use(cors({ origin: '*' }));

app.use(express.json());

app.get('/api/docs', (req: Request, res: Response) => {
  res.json(swaggerDocument);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/auth', authRoute);
app.use('/api', userRoute);
app.use('/api', taskRoute);

app.listen(port, () => {
  console.log(`Node.js running on port ${port}`);
  console.log(`Swagger JSON: http://localhost:${port}/api/docs`);
  console.log(`Swagger UI: http://localhost:${port}/api-docs`);
});
