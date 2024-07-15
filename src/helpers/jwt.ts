import jsonwebtoken from 'jsonwebtoken';

interface IJWTPayload {
    id: string;
    role: string;
    expiryIn: string;
}

export const jwtCreate = async({id, role, expiryIn}: IJWTPayload) => {
    const token = jsonwebtoken.sign({id, role}, 'abc123', {
        expiresIn: expiryIn
    })

    return token
}

export const jwtVerify = async(token: string) => {
    return jsonwebtoken.verify(token, 'abc123')
}