export interface ICreateUserProps{
    email: string;
    username: string; 
    hashedPassword: string;
    role: string;
}

export interface ISaveAccessKeyProps{
    accessToken: string;
    userId: string;
}

export interface IFindUserProps{
    email: string;
}