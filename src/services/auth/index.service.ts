import prisma from '../../connection';
import { IUserProps } from './types';

export const createUserService = async({ email, username, password, role }: IUserProps) => {
    return await prisma.users.create({
        data: {
            email, 
            username, 
            password, 
            role
        }
    })
}

export const findUserByEmailOrUsernameService = async({ email }: Pick<IUserProps, 'email'>) => {
    return await prisma.users.findFirst({
        where: {
            OR: [
                { email: email },
                { username: email }
            ]
        }
    });
}

export const validateAccessKeyService = async({ accessToken }: { accessToken: string }) => {
    return await prisma.users.findFirst({
        where: {
            accessKey: accessToken
        }
    })
}

export const updateAccessKeyService = async({ accessToken, usersId }: { accessToken: string, usersId: string }) => {
    return await prisma.users.update({
        data: {
            accessKey: accessToken
        },
        where: {
            id: usersId
        }
    })
}