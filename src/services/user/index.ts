import prisma from '../../connection';
import { ICreateAddressProps, IFindAddressProps } from './types';

export const createAddressService = async({
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

export const findAddressesService = async({
    req, 
    id
}: IFindAddressProps) => {
    return await prisma.address.findMany({
        where: {
            usersId: id
        }
    })
}