import { Request } from 'express';

export interface ICreateAddressProps{
    req: Request;
    id: string;
    receiver: string;
    phoneNumber: string;
    address: string;
}

export interface IFindAddressProps{
    req: Request;
    id: string;
}