import { prisma } from '../../connection';
import { comparePassword } from '../../utils/hash.password';
import { createToken } from '../../utils/jwt';
import { AppError } from '../../utils/app.error';
import { AuthProps } from './types';

export const loginService = async ({
  email,
  password,
}: Pick<AuthProps, 'email' | 'password'>) => {
  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user)
    throw AppError('We couldnt find an account with that email address', 404);

  const isComparePassword = await comparePassword(password, user.password);

  if (!isComparePassword)
    throw AppError('The password you entered is incorrect', 400);

  const token = createToken({ id: user.id, role: user.role });

  return { token, username: user.username, role: user.role };
};
