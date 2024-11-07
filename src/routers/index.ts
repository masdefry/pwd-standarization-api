import express, { Router } from 'express';
const router = Router();
import authRouter from './auth.router';
import productsRouter from './products.router';
import transactionsRouter from './transactions.router';

router.use('*/images', express.static('src/public/images'))

router.use('/auth', authRouter);
router.use('/products', productsRouter)
router.use('/transactions', transactionsRouter)

export default router; 