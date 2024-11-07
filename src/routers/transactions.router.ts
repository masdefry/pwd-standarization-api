import { Router } from 'express';
const transactionsRouter = Router()

import { createTransaction } from '../controllers/transactions.controller';
import { verifyToken } from '../middlewares/verify.token';

transactionsRouter.post('/', verifyToken, createTransaction)

export default transactionsRouter;