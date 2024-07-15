import express, { Router } from 'express';

const route = Router()
route.use(express.json())

route.use('*/image',express.static('public/image'))

// Import All Router
import AuthRouter from './auth.router';
import ProductRouter from './product.router';
import AddressRouter from './address.router';

route.use('/auth', AuthRouter)
route.use('/product', ProductRouter)
route.use('/user-address', AddressRouter)

export default route