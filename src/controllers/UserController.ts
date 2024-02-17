import {Request, Response, NextFunction} from 'express';
import { responseHandler } from '../helpers/ResponseHandler';
import { createAddressService, findAddressesService } from '../services/user';

export const createAddress = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const decodedAccessPayload = (req as any).decodedAccessPayload
        const newAccessToken = (req as any).newAccessToken

        const { receiver, phoneNumber, address } = req.body

        const createdAddress = await createAddressService({
            req, 
            id: decodedAccessPayload.id,
            receiver, 
            phoneNumber, 
            address
        })

        responseHandler({
            res: res,
            status: 201,
            message: 'Create Address Success!',
            data: {
                createdAddress, 
                newAccessToken: newAccessToken || null
            }
        })
    } catch (error) {
        next(error)
    }
}

export const findAddresses = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const decodedAccessPayload = (req as any).decodedAccessPayload;
        const newAccessToken = (req as any).newAccessToken;

        const addresses = await findAddressesService({
            req, 
            id: decodedAccessPayload.id
        })

        responseHandler({
            res: res,
            message: 'Find Address Success!',
            data: {
                addresses, 
                newAccessToken: newAccessToken || null
            }
        })
    } catch (error) {
        next(error)
    }
}