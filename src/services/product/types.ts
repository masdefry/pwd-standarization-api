import { Request } from "express"

export interface ICreateProductProps{
    req: Request;
    name: string;
    price: number;
    description: string;
    stock: number;
}