import prisma from '../../connection';
import { ICreateAddressProps } from './types';

export const createAddress = async({
    req, 
    id,
    receiver,
    phoneNumber,
    address
}: ICreateAddressProps) => {
    return await prisma.address.create({
        data: {
            receiver,
            phoneNumber, 
            address,
            usersId: id
        }
    })
}