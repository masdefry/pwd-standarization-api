import { NextFunction, Response, Request } from 'express';
import { decodeToken } from '../utils/jwt';

export interface IReqAuth extends Request {
    auth?: {
        usersId: string;
        authorizationRole: string;
    };
}

export const verifyToken = async(req: IReqAuth, res: Response, next: NextFunction) => {
    try {
        let {authorization} = req.headers
        authorization = authorization?.split(' ')[1]

        if(!authorization) throw {msg: 'Token Not Found', status: 400}
        
        const decodedToken = decodeToken(authorization!)
        if (typeof decodedToken !== 'string' && 'data' in decodedToken) {
            req.auth = {
              usersId: decodedToken.data.id,
              authorizationRole: decodedToken.data.role,
            };
        }

        next()
    } catch (error) {
        // Menuju ke Centralized Error
        next(error)
    }
}