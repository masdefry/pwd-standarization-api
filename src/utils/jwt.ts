import jwt from 'jsonwebtoken';

interface ICreateTokenParams{
    id: string, 
    role: string
}

export const createToken = ({id, role}: ICreateTokenParams) => {
    return jwt.sign({ data: {id, role} }, 'jcwd3002', { expiresIn: '1h' })
}

export const decodeToken = (token: string) => {
    return jwt.verify(token, 'jcwd3002')
}