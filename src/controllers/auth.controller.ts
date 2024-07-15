// Handle Request & Response
import {Request, Response, NextFunction} from 'express';
import { hashPassword, hashMatch } from '../helpers/hash-password';
import { createUser, findUser, saveAccessKey } from '../services/auth/index.service';
import { jwtCreate } from '../helpers/jwt';

export const register = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {email, username, password, role} = req.body

        const hashedPassword: string = await hashPassword(password)
        
        await createUser({ email, username, hashedPassword, role })
        
        res.status(201).send({
            error: false,
            message: 'Register User Success',
            data: null
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
            accessToken: Digunakan untuk Mengambil Resource (Token Utama)
            refreshToken: Digunakan untuk Authorization 

            Mengapa expiry date `accessToken` lebih cepat dibanding `refreshToken`?
            Untuk menghindari pencurian token/penyalahgunaan token. Sehingga
            `accessToken` harus sering diperbarui. 

            Dalam implementasinya, ketika `accessToken` expiry, maka 
            client akan mengirimkan `refreshToken` untuk generate `accessToken`
            baru. Sehingga user tidak perlu login ulang untuk mendapatkan
            `accessToken` yang baru. 
        */
        const accessToken = await jwtCreate({id: user.id, role: user.role, expiryIn: '300s'})
        const refreshToken = await jwtCreate({id: user.id, role: user.role, expiryIn: '500s'})
        
        /*
            Untuk mendapatkan expiry date dari `accessToken` dan `refreshToken`.
            Kegunaannya untuk pengecekan di sisi frontend, 
            supaya tidak perlu selalu request ke backend untuk pengecekan
            token nya sudah expiry atau belum. Apabila
            token expiry, maka dari sisi frontend perlu
            melakukan request generate token baru. 
        */

        await saveAccessKey({
            accessToken: accessToken,
            userId: user.id
        })
       
        res.status(200).send({
            error: false,
            message: 'Authentication User Success',
            data: {
                accessToken, 
                refreshToken
            }
        })
    } catch (error) {
        next(error)
    }
}