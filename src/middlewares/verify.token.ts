import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/app.error';

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token || token === 'null') {
      throw AppError('Token Must be Provide', 401);
    }

    const payload = jwt.verify(token, `${process.env.JWT_SECRET_KEY!}`);

    req.body.payload = payload;

    next();
  } catch (error) {
    next(error);
  }
};
