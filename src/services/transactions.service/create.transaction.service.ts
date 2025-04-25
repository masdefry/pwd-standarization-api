import { prisma, mysqlConnection } from '../../connection';
import { addMinutes } from 'date-fns';
import { TransactionProps } from './types';
import { ProductProps } from '../products.service/types';

export const createTransactionService = async ({
  total,
  usersId,
  productItems,
}: Pick<TransactionProps, 'total' | 'usersId'> & { productItems: ProductProps[] }) => {
  await prisma.$transaction(async (tx) => {
    const createdTransaction = await prisma.transaction.create({
      data: {
        total,
        usersId,
        expiredAt: addMinutes(new Date(), 1),
      },
    });

    const transactionItemsToCreate = productItems.map(
      (transactionItem: any) => {
        return {
          productName: transactionItem.productName,
          quantity: transactionItem.quantity,
          price: transactionItem.price,
          transactionsId: createdTransaction.id,
        };
      }
    );

    await prisma.transactionItem.createMany({
      data: transactionItemsToCreate,
    });

    await prisma.transactionStatus.create({
      data: {
        status: 'WAITING_FOR_PAYMENT',
        transactionsId: createdTransaction.id,
      },
    });
  });
};
