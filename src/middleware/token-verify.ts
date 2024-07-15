import { Request, Response, NextFunction } from 'express';
import { jwtVerify } from '../helpers/jwt';
import { jwtCreate } from '../helpers/jwt';
import { validateAccessKey, saveAccessKey } from '../services/auth/index.service';

export const refreshTokenVerify = async (
  refreshToken: string
) => {
  try {
    // Cek, Apakah `refreshToken` Valid & Belum Expiry
    return await jwtVerify(refreshToken);
  } catch (error: any) {
    // Apabila RefreshToken Expiry
    throw {...error, isExpiryRefresh: true}
  }
};

export const accessTokenVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => { 
  try {
    const accessToken: any = req.headers['authorization-access-tkn'];
    const refreshToken: any = req.headers['authorization-refresh-tkn'];

    // Apakah `accessToken` Dikirim dari Client?
    if(!accessToken) throw { status: 401, message: '[Unauthorized] Token Must Provide!' }

    // Apabila `accessToken` dan `refreshToken` Ada, Artinya `accessToken` Telah Expiri dan Membutuhkan
    // `accessToken` Baru dimana Membutuhkan `refreshToken` untuk Men-generate nya
    if(accessToken && refreshToken){
      const refreshPayload = await refreshTokenVerify(refreshToken)
      // Apabila `refreshToken` Tidak Valid, Return Send Error Response
      // ...



      // Apabila `refreshToken` Masih Valid, Generate `accessToken` Baru
      const accessToken = await regenerateAccessToken({refreshPayload})

      req.body.accessToken = accessToken
      req.body.refreshPayload = refreshPayload

      return next()

    }

    // Apakah `accessToken` Menggunakan Latest `accessToken` yang Ada di Database?
    const validateAccessKeyResult = await validateAccessKey({ accessToken: accessToken })
  
    if(!validateAccessKeyResult) throw { status: 401, message: '[Unauthorized] Token Invalid!' }

    // Verify, Apakah `accessToken` Valid & Belum Expiry?
    const accessPayload: any = await jwtVerify(accessToken);

    req.body.accessPayload = accessPayload;

    next();
  } catch (error: any) {
    if(error.message === 'jwt expired' && error.isExpiryRefresh){
      next({
        ...error, 
        isExpiryToken: 'refresh'
      })
    }
    // Apabila `accessToken` Expiry, Kirim Response `isExpiryAccess = true`
    // untuk Kebutuhan Axios Interceptor Supaya Dapat Mengirimkan `refreshToken` untuk Pembaharuan `accessToken` 
    if(error.message === 'jwt expired'){
      next({
        ...error, 
        isExpiryToken: 'access'
      })
    }

    next(error)
  }
};

export const regenerateAccessToken = async ({refreshPayload}: any) => {
  const accessToken = await jwtCreate({id: refreshPayload.id, role: refreshPayload.role, expiryIn: '300s'});

  await saveAccessKey({ 
    accessToken: accessToken, 
    userId: refreshPayload.id
  });

  return accessToken
};