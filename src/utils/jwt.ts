import jwt from 'jsonwebtoken';

interface CreateTokenProps {
  id: string;
  role: string;
}

export const createToken = ({ id, role }: CreateTokenProps) => {
  return jwt.sign({ data: { id, role } }, 'jcwd3002', { expiresIn: '1d' });
};
