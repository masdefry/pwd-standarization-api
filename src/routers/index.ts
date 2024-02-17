import express, { Router } from "express";

const route = Router()
route.use(express.json())

route.use('*/image',express.static('public/image'))

// Import All Router
import UserRouter from './AuthRouter';
import ProductRouter from './ProductRouter';

route.use('/auth', UserRouter)
route.use('/product', ProductRouter)

export default route