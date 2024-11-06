import { NextFunction, Response, Request } from 'express';
import { IReqVerifyToken } from './verify.token';

export const verifyRole = async(req: IReqVerifyToken, res: Response, next: NextFunction) => {
    try {
        const {authorizationRole} = req.auth

        if(authorizationRole !== 'HR') throw {msg: 'User Unauthorized', status: 401}

        next()
    } catch (error) {
        // Menuju ke Centralized Error
        next(error)
    }
}