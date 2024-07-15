import prisma from '../../connection';
import { ICreateUserProps, IFindUserProps, ISaveAccessKeyProps } from './types';

export const createUser = async({ email, username, hashedPassword, role }: ICreateUserProps) => {
    return await prisma.users.create({
        data: {
            email, 
            username, 
            password: hashedPassword, 
            role
        }
    })
}

export const findUser = async({ email }: IFindUserProps) => {
    return await prisma.users.findFirst({
        where: {
            OR: [
                { email: email },
                { username: email }
            ]
        }
    });
}

export const validateAccessKey = async({ accessToken }: any) => {
    return await prisma.users.findFirst({
        where: {
            accessKey: accessToken
        }
    })
}

export const saveAccessKey = async({ accessToken, userId }: ISaveAccessKeyProps) => {
    return await prisma.users.update({
        data: {
            accessKey: accessToken
        },
        where: {
            id: userId
        }
    })
}