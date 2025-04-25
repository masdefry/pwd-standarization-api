import { NextFunction, Request, Response } from 'express';
import { loginService } from '../../services/auth.service/login.service';
import { sessionLoginService } from '../../services/auth.service/session.login.service';
import { AuthProps } from '../../services/auth.service/types';

export const authLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const { token, username, role } = await loginService({ email, password });

    res.status(200).json({
      error: false,
      message: 'You have successfully logged in',
      users: {
        token,
        username,
        role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const sessionLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body.payload;

    const user: AuthProps = await sessionLoginService({ id });

    res.status(200).json({
      error: false,
      message: 'Your session is active',
      users: {
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
