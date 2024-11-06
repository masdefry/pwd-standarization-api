import { IAuth } from './types';
import { prisma } from '../../connection';
import { comparePassword, hashPassword } from '../../utils/hash.password';

export const authLoginService = async({email, password}: Pick<IAuth, 'email' | 'password'>) => {
    const findUsers = await prisma.user.findMany({
        where: { email }
    })

    if(!findUsers.length) throw {msg: 'Email Belum Terdaftar', status: 400}

    const isComparePassword = await comparePassword(password, findUsers[0].password)

    if(!isComparePassword) throw {msg: 'Password Tidak Sesuai', status: 400}

    return findUsers
}

export const keepAuthService = async({id}: Pick<IAuth, 'id'>) => {
    const findUser = await prisma.user.findUnique({
        where: { id }
    })
    
    if(!findUser?.id) throw {msg: 'User Tidak Ditemukan', status: 400}

    return findUser
}


