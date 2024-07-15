export interface ICreateAddressProps{
    usersId: string;
    receiver: string;
    phoneNumber: string;
    address: string;
}

export interface IFindAddressByUserIdProps{
    usersId: string;
}