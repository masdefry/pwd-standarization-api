// Handle Request & Response
import {Request, Response, NextFunction} from 'express';

import prisma from '../connection';

import { hashPassword, hashMatch } from '../lib/HashPassword';
import { jwtCreate, jwtVerify } from '../lib/JWT';

export const register = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {email, username, password, role} = req.body

        if(!email || !username || !password || !role) throw {message: 'Data Not Complete!'}

        const hashedPassword: string = await hashPassword(password)
        
        const createUser = await prisma.users.create({
            data: {
                email, 
                username, 
                password: hashedPassword, 
                role
            }
        })

        res.status(200).send({
            error: false, 
            message: 'Register Success',
            data: null
        })
    } catch (error) {
        next(error)
    }
}

export const login = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {email, password} = req.body
  
        const user = await prisma.users.findFirst({
            where: {
                OR: [
                    {email: email}, 
                    {username: email}
                ]
            }
        })
        
        if(user === null) throw {message: 'Username or Email Not Found'}

        const isComparePassword = await hashMatch(password, user.password)
        
        if(isComparePassword === false) throw {message: 'Password Doesnt Match'}
        
        /*
            accessToken: Digunakan untuk mengambil resource
            refreshToken: Digunakan untuk authorization 

            Mengapa expiry date refreshToken lebih lama dari accessToken?
            Untuk menghindari pencurian token/penyalahgunaan token. Sehingga
            accessToken harus sering diperbarui. 

            Dalam implementasinya, ketika accessToken expired, maka 
            client akan mengirimkan refreshToken untuk generate accessToken
            baru. Sehingga user tidak perlu login ulang untuk mendapatkan
            accessToken yang baru. 
        */
        const accessToken = await jwtCreate({id: user.id, role: user.role, expiryIn: '1h'})
        const refreshToken = await jwtCreate({id: user.id, role: user.role, expiryIn: '7d'})
        
        /*
            Untuk mendapatkan expiry date dari accessToken dan refreshToken.
            Kegunaannya untuk pengecekan di sisi frontend, 
            supaya tidak perlu selalu request ke backend untuk pengecekan
            token nya sudah expired atau belum. Apabila
            token expired, maka dari sisi frontend perlu
            melakukan request generate token baru. 
        */
        const expAccessToken = await jwtVerify(accessToken)
        const expRefreshToken = await jwtVerify(refreshToken)
        
        res.status(200).send({
            error: false, 
            message: 'Login Success', 
            data: {
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
        console.log(error)
        next(error)
    }
}