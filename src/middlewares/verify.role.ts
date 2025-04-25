import { NextFunction, Response, Request } from 'express';

export const verifyRole =
  (allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userRole } = req.body.payload;

      if (!allowedRoles.includes(userRole)) {
        throw { msg: 'User Unauthorized', status: 401 };
      }

      next();
    } catch (error) {
      next(error);
    }
  };
