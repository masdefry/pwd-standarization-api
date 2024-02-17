import prisma from '../../connection';
import { ICreateUser, IFindUser, IFindUserResult } from './types';

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