import { Router } from 'express';
const productsRouter = Router()

import { findProducts } from '../controllers/products.controller';

productsRouter.get('/', findProducts)

export default productsRouter;