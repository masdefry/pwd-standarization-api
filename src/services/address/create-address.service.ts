import prisma from '../../connection';
import { ICreateAddressProps } from './types';

export const createAddressService = async({
    usersId,
    receiver,
    phoneNumber,
    address
}: ICreateAddressProps) => {
    return await prisma.address.create({
        data: {
            receiver,
            phoneNumber, 
            address,
            usersId
        }
    })
}