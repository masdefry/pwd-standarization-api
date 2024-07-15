import bcrypt from 'bcrypt';

export const hashPassword = async(password: string): Promise<string> => {
    const saltRounds: number = 10;
    return await bcrypt.hash(password, saltRounds)
}

export const hashMatch = async(passwordBody: string, passwordDb: string): Promise<boolean> => {
    return await bcrypt.compare(passwordBody, passwordDb)
}