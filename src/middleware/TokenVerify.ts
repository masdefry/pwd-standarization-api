import { Request, Response, NextFunction } from 'express';
import { jwtVerify } from '../lib/JWT';
import { jwtCreate } from '../lib/JWT';
import { responseHandler } from '../helpers/ResponseHandler';

export const refreshTokenVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token: any = req.headers.authrefreshkey;

    const decodedRefreshPayload = await jwtVerify(token);

    (req as any).decodedRefreshPayload = decodedRefreshPayload

    next();
  } catch (error: any) {
    next(error)
  }
};

export const accessTokenVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token: any = req.headers.authaccesskey;

    const decodedAccessPayload: any = await jwtVerify(token);

    if (decodedAccessPayload.role !== 'USER') throw { denied: true, message: 'Access Denied!' };

    (req as any).decodedAccessPayload = decodedAccessPayload;

    next();
  } catch (error: any) {
    if(error.denied) next(error)

    next()
  }
};

export const regenerateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let decodedRefreshPayload: any = (req as any).decodedRefreshPayload;
    let decodedAccessPayload: any = (req as any).decodedAccessPayload;
    
    if(!decodedAccessPayload && decodedRefreshPayload){
      let accessToken = await jwtCreate({id: decodedRefreshPayload.id, role: decodedRefreshPayload.role, expiryIn: '30s'});

      (req as any).decodedAccessPayload = decodedRefreshPayload;
      (req as any).newAccessToken = accessToken;
    }

    next()
  } catch (error: any) {
    next(error)
  }
};