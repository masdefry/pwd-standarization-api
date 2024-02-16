// Handle Request & Response
import {Request, Response, NextFunction} from 'express';

import prisma from '../connection';

import { hashPassword, hashMatch } from '../lib/HashPassword';
import { jwtCreate } from '../lib/JWT';

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

        const token = await jwtCreate({id: createUser.id, role: createUser.role})

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
  
        const admin = await prisma.users.findFirst({
            where: {
                OR: [
                    {email: email}, 
                    {username: email}
                ]
            }
        })
        
        if(admin === null) throw {message: 'Username or Email Not Found'}

        const isComparePassword = await hashMatch(password, admin.password)
        
        if(isComparePassword === false) throw {message: 'Password Doesnt Match'}
        
        const token = await jwtCreate({id: admin.id, role: admin.role})
    
        res.status(200).send({
            error: false, 
            message: 'Login Success', 
            data: {
                username: admin.username,
                token
            }
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}