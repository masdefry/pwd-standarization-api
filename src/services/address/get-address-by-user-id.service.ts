import prisma from '../../connection';
import { IFindAddressByUserIdProps } from './types';

export const findAddressByUserIdService = async({
    usersId
}: IFindAddressByUserIdProps) => {
    return await prisma.address.findMany({
        where: {
            usersId
        }
    })
}