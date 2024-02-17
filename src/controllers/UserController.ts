import {Request, Response, NextFunction} from 'express';
import { responseHandler } from '../helpers/ResponseHandler';
import { createAddress } from '../services/user';

export const create = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const decodedAccessPayload = (req as any).decodedAccessPayload
        const newAccessToken = (req as any).newAccessToken

        const { receiver, phoneNumber, address } = req.body

        const createdAddress = await createAddress({
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