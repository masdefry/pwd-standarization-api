import { Request, Response, NextFunction } from 'express';

const authorizedVerifyUser = ['USER']

export const roleVerifyUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => { 
    try {
      const accessPayload = req.body.accessPayload;
  
      if(!authorizedVerifyUser.includes(accessPayload.role)) throw { status: 401, message: '[Unauthorized] Access Denied' };

      next();
    } catch (error: any) {
      next(error)
    }
  };