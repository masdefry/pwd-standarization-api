import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { AppError } from './utils/app.error';

const app: Express = express();
const port = 5000;
app.use(express.json())
app.use(cors({
  origin: '*'
}))

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Welcome to Express Typescript Server</h1>');
});

import router from './routers';
app.use('/api', router)

// Centralized Error
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  const statusCode =
    error.statusCode ||
    (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError'
      ? 401
      : 500);
  const message =
    error instanceof AppError || error.isOperational
      ? error.message ||
        error.name === 'TokenExpiredError' ||
        error.name === 'JsonWebTokenError'
      : 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});