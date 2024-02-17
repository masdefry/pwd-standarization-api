import jsonwebtoken from 'jsonwebtoken';

interface IJWTCreate {
    id: string;
    role: string;
    expiryIn: string;
}

export const jwtCreate = async({id, role, expiryIn}: IJWTCreate) => {
    const token = jsonwebtoken.sign({id, role}, 'abc123', {
        expiresIn: expiryIn
    })

    const expiry: any = await jwtVerify(token)

    return { token, expiry }
}

export const jwtVerify = async(token: string) => {
    return jsonwebtoken.verify(token, 'abc123')
}