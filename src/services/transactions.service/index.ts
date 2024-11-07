import { prisma, mysqlConnection } from '../../connection'
import {addMinutes} from 'date-fns'

export const createTransactionService = async({total, productItems, usersId}: any) => {
    await prisma.$transaction(async(tx) => {
        const createdTransaction = await prisma.transaction.create({
            data: {
                total, 
                usersId, 
                expiredAt: await addMinutes(new Date(), 1)
            }
        })

        const transactionItemsToCreate = productItems.map((transactionItem: any) => {
            return { 
                productName: transactionItem.productName, 
                quantity: transactionItem.quantity, 
                price: transactionItem.price,
                transactionsId:  createdTransaction.id
            }
        })

        await prisma.transactionItem.createMany({
            data: transactionItemsToCreate
        })

        await prisma.transactionStatus.create({
            data: {
                status: 'WAITING_FOR_PAYMENT',
                transactionsId: createdTransaction.id
            }
        })

        // EVENT SCHEDULER 
        const query = await mysqlConnection()
        await query.query(`
            CREATE EVENT transaction_${createdTransaction.id}
            ON SCHEDULE AT NOW() + INTERVAL 1 MINUTE
            DO 
            BEGIN
                INSERT INTO transaction_statuses (status, transactionsId) VALUES ('EXPIRED', ${createdTransaction.id});
            END
        `);
    } )
}