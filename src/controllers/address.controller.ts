import {Request, Response, NextFunction} from 'express';
import { createAddressService } from '../services/address/create-address.service';
import { findAddressByUserIdService } from '../services/address/get-address-by-user-id.service';

export const createAddress = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const accessPayload = req.body.accessPayload

        const { receiver, phoneNumber, address } = req.body

        const createdAddress = await createAddressService({
            usersId: accessPayload.id,
            receiver, 
            phoneNumber, 
            address
        })

        res.status(201).send({
            error: false,
            message: 'Create User Address Success',
            data: {
                createdAddress
            }
        })
    } catch (error) {
        next(error)
    }
}

export const findAddress = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const accessPayload = req.body.accessPayload;

        const addressByUserId = await findAddressByUserIdService({
            usersId: accessPayload.id
        })

        res.status(200).send({
            error: false, 
            message: 'Find User Address Success',
            data: {
                addressByUserId
            }
        })
    } catch (error) {
        next(error)
    }
}