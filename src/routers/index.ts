import express, { Router } from 'express';

const route = Router()
route.use(express.json())

route.use('*/image',express.static('public/image'))

// Import All Router
import AuthRouter from './AuthRouter';
import ProductRouter from './ProductRouter';
import UserRouter from './UserRouter';

route.use('/auth', AuthRouter)
route.use('/product', ProductRouter)
route.use('/user', UserRouter)

export default route