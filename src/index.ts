import express, { Express, Request, Response, NextFunction } from "express";
import cors from 'cors';

const app: Express = express();
app.use(cors())

const port: number = 5000;

import route from "./routers";

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Welcome to Dashboard API</h1>')
})

app.use(route)

interface INewError extends Error{
    status: number, 
    isExpiryToken: boolean
}
app.use((err: INewError, req: Request, res: Response, next: NextFunction) => { 
    res.status(err.status || 500).send({
        error: true, 
        message: err.message || 'Something Wrong!',
        data: {isExpiryToken: err.isExpiryToken} || null
    })
})

app.listen(port, () => {
    console.log(`[SERVER] Server Running on Port ${port}`)
})