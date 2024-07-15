import { Router } from 'express';

// Define Variable
const route = Router()

// Import Product Controller
import * as productController from '../controllers/product.controller';

// Import Middleware
import { accessTokenVerify } from '../middlewares/token-verify';
import { UploadValidator } from '../middlewares/upload-validator';

route.post('/', accessTokenVerify, UploadValidator, productController.createProduct)

export default route