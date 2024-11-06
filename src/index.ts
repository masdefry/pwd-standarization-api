import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';

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
interface IError extends Error{
  status: number, 
  msg: string
}
app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  res.status(err.status || 500).json({
    error: true, 
    message: err.msg? err.msg : err.name === 'TokenExpiredError'? err.message : 'Something Went Wrong!',
    data: {}
  })
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});