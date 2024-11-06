export interface IAuth{
    id?: string, 
    username: string, 
    email: string, 
    password: string, 
    role: Role | string,  
    createdAt?: Date, 
    updatedAt?: Date, 
    deletedAt?: Date | null
}

export enum Role{
    USER, 
    ADMIN, 
    SUPER_ADMIN
}