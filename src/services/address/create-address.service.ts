import prisma from '../../connection';
import { IAddressProps } from './types';

export const createAddressService = async({
    usersId,
    receiver,
    phoneNumber,
    address
}: IAddressProps) => {
    return await prisma.address.create({
        data: {
            receiver,
            phoneNumber, 
            address,
            usersId
        }
    })
}