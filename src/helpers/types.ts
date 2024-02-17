import { Response } from "express";

export interface IResponseHandlerProps{
    res: Response;
    status?: number; 
    data?: any;
    message: string;
    error?: boolean;
}