import { AuthProps } from './types';
import { prisma } from '../../connection';
import { AppError } from '../../utils/app.error';

export const sessionLoginService = async ({ id }: Pick<AuthProps, 'id'>) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user?.id) throw AppError('User not found', 404);

  return user;
};
