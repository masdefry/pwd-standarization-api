export interface ICreateUser{
    email: string;
    username: string; 
    hashedPassword: string;
    role: string;
}

export interface IFindUser{
    email: string;
}

export interface IFindUserResult{
    id: string;
    email: string;
    username: string;
    password: string; 
    role: string;
    verified: number;
    createdAt: string;
    updatedAt: string; 

}