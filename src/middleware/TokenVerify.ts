import { Request, Response, NextFunction } from 'express';
import { jwtVerify } from '../lib/JWT';
import { jwtCreate } from '../lib/JWT';
import { validateAccessKey, saveAccessKey } from '../services/auth';

export const refreshTokenVerify = async (
  refreshToken: string
) => {
  try {
    // Cek, Apakah RefreshToken Valid & Belum Expiry
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
    const accessToken: any = req.headers.authaccesskey;
    const refreshToken: any = req.headers.authrefreshkey;

    // Cek, Apakah AccessToken Dikirim dari Client
    if(!accessToken) throw { status: 401, message: 'Unauthorized! Token Must Provide!' }

    if(accessToken && refreshToken){
      const decodedRefreshPayload = await refreshTokenVerify(refreshToken)
      // Apabila RefreshToken Masih Valid, Generate AccessToken Baru
      console.log(decodedRefreshPayload)
      console.log('>>>')
    }

    // Cek, Apakah AccessToken Menggunakan Latest AccessToken?
    const validateAccessKeyResult = await validateAccessKey({ accessToken: accessToken })
  
    if(!validateAccessKeyResult) throw { status: 401, message: 'Unauthorized! Token Invalid!' }

    // Verify, Apakah AccessToken Valid & Belum Expiry
    const decodedAccessPayload: any = await jwtVerify(accessToken);

    (req as any).decodedAccessPayload = decodedAccessPayload;

    next();
  } catch (error: any) {
    if(error.message === 'jwt expired' && error.isExpiryRefresh){
      next({
        ...error, 
        isExpiryToken: 'refresh'
      })
    }
    // Apabila AccessToken Expiry, Kirim Response isExpiryAccess = true
    // untuk Kebutuhan Axios Interceptor Supaya Dapat Mengirimkan
    // RefreshToken untuk Pembaharuan AccessToken 
    if(error.message === 'jwt expired'){
      next({
        ...error, 
        isExpiryToken: 'access'
      })
    }

    next(error)
  }
};

export const regenerateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let decodedRefreshPayload: any = (req as any).decodedRefreshPayload;
    let decodedAccessPayload: any = (req as any).decodedAccessPayload;
    
    if(!decodedAccessPayload && decodedRefreshPayload){
      let accessToken = await jwtCreate({id: decodedRefreshPayload.id, role: decodedRefreshPayload.role, expiryIn: '300s'});

      await saveAccessKey({ 
        accessToken: accessToken.token, 
        userId: decodedRefreshPayload.id
       });

      (req as any).decodedAccessPayload = decodedRefreshPayload;
      (req as any).newAccessToken = accessToken;
    }

    next()
  } catch (error: any) {
    next(error)
  }
};