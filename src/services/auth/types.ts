export interface IUserProps{
    email: string;
    username: string; 
    password: string;
    role: Role;
}

enum Role{
    USER,
    SUPER_ADMIN,
    ADMIN
}