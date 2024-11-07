"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransactionService = void 0;
const connection_1 = require("../../connection");
const date_fns_1 = require("date-fns");
const createTransactionService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ total, productItems, usersId }) {
    yield connection_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const createdTransaction = yield connection_1.prisma.transaction.create({
            data: {
                total,
                usersId,
                expiredAt: yield (0, date_fns_1.addMinutes)(new Date(), 1)
            }
        });
        const transactionItemsToCreate = productItems.map((transactionItem) => {
            return {
                productName: transactionItem.productName,
                quantity: transactionItem.quantity,
                price: transactionItem.price,
                transactionsId: createdTransaction.id
            };
        });
        yield connection_1.prisma.transactionItem.createMany({
            data: transactionItemsToCreate
        });
        yield connection_1.prisma.transactionStatus.create({
            data: {
                status: 'WAITING_FOR_PAYMENT',
                transactionsId: createdTransaction.id
            }
        });
        // EVENT SCHEDULER 
        const query = yield (0, connection_1.mysqlConnection)();
        yield query.query(`
            CREATE EVENT transaction_${createdTransaction.id}
            ON SCHEDULE AT NOW() + INTERVAL 1 MINUTE
            DO 
            BEGIN
                INSERT INTO transaction_statuses (status, transactionsId) VALUES ('EXPIRED', ${createdTransaction.id});
            END
        `);
    }));
});
exports.createTransactionService = createTransactionService;
