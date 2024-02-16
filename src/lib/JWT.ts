import jsonwebtoken from 'jsonwebtoken';

interface IJWTCreate {
    id: string;
    role: string;
    expiryIn: string;
}

export const jwtCreate = async({id, role, expiryIn}: IJWTCreate) => {
    return jsonwebtoken.sign({id, role}, 'abc123', {
        expiresIn: expiryIn
    })
}

export const jwtVerify = async(token: string) => {
    return jsonwebtoken.verify(token, 'abc123')
}