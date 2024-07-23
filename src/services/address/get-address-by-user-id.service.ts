import prisma from '../../connection';
import { IAddressProps } from './types';

export const findAddressByUserIdService = async({
    usersId
}: Pick<IAddressProps, 'usersId'>) => {
    return await prisma.address.findMany({
        where: {
            usersId
        }
    })
}