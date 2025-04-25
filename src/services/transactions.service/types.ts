export interface TransactionProps {
  id: string;
  total: string;
  usersId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}