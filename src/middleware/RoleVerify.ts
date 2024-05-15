import { Request, Response, NextFunction } from 'express';

const authorizedVerifyUser = ['USER']
export const roleVerifyUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => { 
    try {
      const decodedAccessPayload = (req as any).decodedAccessPayload;
      console.log(decodedAccessPayload)
      if(!authorizedVerifyUser.includes(decodedAccessPayload.role)) throw { status: 401, message: 'Unauthorized! Access Denied!' };

      next();
    } catch (error: any) {
      next(error)
    }
  };