import { NextFunction, Request, Response } from "express";
import { IReqAuth } from "../../middlewares/verify.token";
import { createTransactionService } from "../../services/transactions.service";

export const createTransaction = async(req: IReqAuth, res: Response, next: NextFunction) => {
    try {
        const {
            total,
            productItems
        } = req.body 
        const usersId = req?.auth?.usersId 

        await createTransactionService({total, productItems, usersId})

        res.status(201).json({
            message: 'Create Transaction Success'
        })
    } catch (error) {
        next(error)
    }
}