import prisma from '../../connection';
import { ICreateUser, IFindUser, IFindUserResult, ISaveAccessKey } from './types';

export const createUser = async({ email, username, hashedPassword, role }: ICreateUser) => {
    return await prisma.users.create({
        data: {
            email, 
            username, 
            password: hashedPassword, 
            role
        }
    })
}

export const validateAccessKey = async({ accessToken }: any) => {
    return await prisma.users.findFirst({
        where: {
            accessKey: accessToken
        }
    })
}

export const saveAccessKey = async({ accessToken, userId }: ISaveAccessKey) => {
    return await prisma.users.update({
        data: {
            accessKey: accessToken
        },
        where: {
            id: userId
        }
    })
}

export const findUser = async({ email }: IFindUser): Promise<IFindUserResult | null> => {
    return await prisma.users.findFirst({
        where: {
            OR: [
                { email: email },
                { username: email }
            ]
        }
    });
}