import { NextFunction, Request, Response } from 'express';
import { authLoginService, keepAuthService } from '../../services/auth.service';
import { createToken } from '../../utils/jwt';
import { IAuth } from '../../services/auth.service/types';

export const authLogin = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body 

        const user = await authLoginService({email, password})

        const token = await createToken({id: user[0].id, role: user[0].role})

        res.status(200).json({
            error: false, 
            message: 'Login Success',
            data: {
                token,
                username: user[0].username, 
                role: user[0].role
            }
        })
    } catch (error) {
        next(error)
    }
}

export const keepAuth = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {usersId} = req.auth 
        
        const user: IAuth = await keepAuthService({id: usersId})
        
        res.status(200).json({
            error: false, 
            message: 'Keep Auth Success', 
            data: {
                username: user.username,
                role: user.role, 
            }
        })
    } catch (error) {
        console.log(error)
    }
}