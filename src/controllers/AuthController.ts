// Handle Request & Response
import {Request, Response, NextFunction} from 'express';
import { hashPassword, hashMatch } from '../lib/HashPassword';
import { createUser, findUser } from '../services/auth';
import { jwtCreate, jwtVerify } from '../lib/JWT';
import { responseHandler } from '../helpers/ResponseHandler';

export const register = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {email, username, password, role} = req.body

        const hashedPassword: string = await hashPassword(password)
        
        await createUser({ email, username, hashedPassword, role })
        
        responseHandler({
            res: res,
            status: 201,
            message: 'Register Success!',
        })
    } catch (error) {
        next(error)
    }
}

export const login = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {email, password} = req.body
  
        const user = await findUser({ email })
        
        if(user === null) throw {message: 'Username or Email Not Found'}

        const isComparePassword = await hashMatch(password, user.password)
        
        if(isComparePassword === false) throw {message: 'Password Doesnt Match'}
        
        /*
            accessToken: Digunakan untuk mengambil resource (Token Utama)
            refreshToken: Digunakan untuk authorization 

            Mengapa expiry date accessToken hanya sebentar dibanding refreshToken?
            Untuk menghindari pencurian token/penyalahgunaan token. Sehingga
            accessToken harus sering diperbarui. 

            Dalam implementasinya, ketika accessToken expired, maka 
            client akan mengirimkan refreshToken untuk generate accessToken
            baru. Sehingga user tidak perlu login ulang untuk mendapatkan
            accessToken yang baru. 
        */
        const accessToken = await jwtCreate({id: user.id, role: user.role, expiryIn: '10s'})
        const refreshToken = await jwtCreate({id: user.id, role: user.role, expiryIn: '500s'})
        
        /*
            Untuk mendapatkan expiry date dari accessToken dan refreshToken.
            Kegunaannya untuk pengecekan di sisi frontend, 
            supaya tidak perlu selalu request ke backend untuk pengecekan
            token nya sudah expired atau belum. Apabila
            token expired, maka dari sisi frontend perlu
            melakukan request generate token baru. 
        */
        const expAccessToken: any = await jwtVerify(accessToken)
        const expRefreshToken: any = await jwtVerify(refreshToken)

        responseHandler({
            res: res,
            message: 'Login Success!',
            data:  {
                username: user.username,
                role: user.role,
                accessToken: {
                    token: accessToken,
                    expiry:  expAccessToken.exp
                },
                refreshToken: {
                    token: refreshToken, 
                    expiry: expRefreshToken.exp
                }
            }
        })
    } catch (error) {
        next(error)
    }
}