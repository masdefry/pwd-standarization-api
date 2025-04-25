import { NextFunction, Request, Response } from 'express';
import { createTransactionService } from '../../services/transactions.service/create.transaction.service';

export const createTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { total, productItems } = req.body;
    const { id } = req.body.payload;

    await createTransactionService({ total, productItems, usersId: id });

    res.status(201).json({
      message: 'Create Transaction Success',
    });
  } catch (error) {
    next(error);
  }
};
